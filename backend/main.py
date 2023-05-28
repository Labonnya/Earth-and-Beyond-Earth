import sqlite3
import requests
from bs4 import BeautifulSoup, Comment
from fastapi import FastAPI, Depends, HTTPException,status, Query, Response
import schema, models, database, oauth2
from database import engine,SessionLocal
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from routers import authentication, mcq, quiz, user, plays, otp
from fastapi import BackgroundTasks
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
import pdfkit

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with the origins that should be allowed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)
app.include_router(authentication.router)
app.include_router(mcq.router)
app.include_router(quiz.router)
app.include_router(user.router)
app.include_router(plays.router)
app.include_router(otp.router)

@app.post("/sync")
async def sync_data():
    url = 'https://www.infoplease.com/countries'

    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    country_links = soup.find_all('a', {'class': 'name-anchor'})
    countries = [link['href'] for link in country_links]

    to_remove = ['/countries/timor-leste','/countries/north-macedonia','/countries/united-kingdom/northern-ireland','/countries/palestine','/countries/sao-tome-principe','/countries/st-vincent-and-the-grenadines','/countries/western-sahara']

    for item in to_remove:
        if item in countries:
            countries.remove(item)

    # Connect to the database
    conn = sqlite3.connect('blogs.db')
    c = conn.cursor()

    # Insert the data into the countries table
    for country in countries:
        # Generate a custom URL for the current country
        country_url = f'https://www.infoplease.com{country}'

        # Make a request to the country page and parse the HTML content
        response = requests.get(country_url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the section that contains the history information
        history_section = soup.find('div', {'class': 'robot-content'})

        # Extract the text content of the history section
        history_text = history_section.get_text()

        country = country.split("/")[-1]

        # Initialize variables to store the information
        geo_info = ''
        govt_info = ''
        history_info = ''

        # Find all h2, h3, and h4 tags
        headers = soup.find_all(['h2', 'h3', 'h4', 'h5'])

        # Loop through the headers and extract the information
        try:
            for header in headers:
                # Get the text content of the header
                header_text = header.get_text().strip()
                
                # Find the corresponding information based on the header text
                if header_text == 'Geography':
                    # Append the information to the geography variable
                    for tag in header.find_next_siblings():
                        if tag.name == 'h2' or tag.name == 'h3' or tag.name == 'h4' or tag.name == 'h5':
                            break
                        elif tag.name == 'p':
                            geo_info += tag.get_text()
                elif header_text == 'Government':
                    # Append the information to the government variable
                    for tag in header.find_next_siblings():
                        if tag.name == 'h2' or tag.name == 'h3' or tag.name == 'h4' or tag.name == 'h5':
                            break
                        elif tag.name == 'p' and not tag.find('a') and not tag.text.strip().startswith('&nbsp;'):
                            govt_info += tag.get_text()
                elif header_text == 'History':
                    # Append the information to the history variable
                    for tag in header.find_next_siblings():
                        if tag.name == 'h2' or tag.name == 'h3' or tag.name == 'h4' or tag.name == 'h5':
                            break
                        elif tag.name == 'p':
                            history_info += tag.get_text()

        except:
            pass
        
        factbook_section = soup.find("div", {"class": "country-main"})
        fact_items = factbook_section.find_all("ul")

        facts = ''
        for item in fact_items:
            fact_paragraphs = item.find_all("p")
            for fact in fact_paragraphs:
                facts += fact.get_text() + '\n'

        # Insert the data into the countries table
        c.execute('INSERT INTO countries (name, geography, government, history, general_facts) VALUES (?, ?, ?, ?, ?)', (country, geo_info, govt_info, history_info, facts))
    # Commit the changes and close the connection
    conn.commit()
    conn.close()
    return {"message": "Data sync complete!"}

@app.get('/country/{name}')
async def get_country_history(name: str):
    # Connect to the database
    conn = sqlite3.connect('blogs.db')
    c = conn.cursor()

    # Get the data from the countries table
    c.execute('SELECT geography, government, history, general_facts FROM countries WHERE name = ?', (name,))
    row = c.fetchone()

    # Close the connection
    conn.close()

    # If the country is not found, return a 404 response
    if not row:
        return {'error': 'Country not found'}

    # Otherwise, return the name and history data
    geography, government, history, general_facts = row
    return {'name': name, 'geography': geography, 'government': government, 'history': history, 'general_facts': general_facts}

@app.get("/ocean-info")
async def get_ocean_info():
    try:
        # Connect to the database
        conn = sqlite3.connect('mapping_the_world.db')
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        # Execute SQL query to fetch all data from the table
        query = "SELECT title, content, imageURL FROM ocean_info"
        c.execute(query)

        # Fetch all rows
        rows = c.fetchall()

        # Close the connection
        conn.close()

        # If no rows are found, return a 404 response
        if not rows:
            return {'error': 'Ocean information not found'}

        # Convert the rows into a list of dictionaries
        ocean_info = [
            {'title': row['title'], 'content': row['content'], 'imageURL': row['imageURL']}
            for row in rows
        ]

        # Return the fetched data
        return ocean_info

    except Exception as e:
        return {'error': str(e)}
    
@app.get("/wonders")
async def get_wonders():
    try:
        # Connect to the database
        conn = sqlite3.connect('mapping_the_world.db')
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        # Execute SQL query to fetch all data from the table
        query = "SELECT name, description, imageURL, location, yearBuilt, builder FROM wonders"
        c.execute(query)

        # Fetch all rows
        rows = c.fetchall()

        # Close the connection
        conn.close()

        # If no rows are found, return a 404 response
        if not rows:
            return {'error': 'Wonders not found'}

        # Convert the rows into a list of dictionaries
        wonders = [
            {
                'name': row['name'],
                'description': row['description'],
                'imageURL': row['imageURL'],
                'location': row['location'],
                'yearBuilt': row['yearBuilt'],
                'builder': row['builder']
            }
            for row in rows
        ]

        # Return the fetched data
        return wonders

    except Exception as e:
        return {'error': str(e)}

@app.get("/climate")
async def get_climate():
    try:
        # Connect to the database
        conn = sqlite3.connect('mapping_the_world.db')
        conn.row_factory = sqlite3.Row
        c = conn.cursor()

        # Execute SQL query to fetch all data from the table
        query = "SELECT name, details FROM climate"
        c.execute(query)

        # Fetch all rows
        rows = c.fetchall()

        # Close the connection
        conn.close()

        # If no rows are found, return a 404 response
        if not rows:
            return {'error': 'Climate information not found'}

        # Convert the rows into a list of dictionaries
        climate_info = [
            {'name': row['name'], 'details': row['details']}
            for row in rows
        ]

        # Return the fetched data
        return climate_info

    except Exception as e:
        return {'error': str(e)}


@app.get("/table-data")
async def get_table_data():
    conn = sqlite3.connect('blogs.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()

    c.execute("SELECT * FROM download")
    rows = c.fetchall()

    table_data = []
    for row in rows:
        table_data.append({
            "id": row["id"],
            "name": row["name"],
            "capitals": row["capitals"],
            "currency": row["currency"],
            "language": row["language"],
            "religion": row["religion"]
        })

    conn.close()

    return table_data

@app.get("/table-data/{name}")
async def get_table_data(name: str):
    conn = sqlite3.connect('blogs.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()

    c.execute('SELECT capitals, currency, language, religion FROM download WHERE name = ?', (name,))
    row = c.fetchone()

    # Close the connection
    conn.close()

    # If the country is not found, return a 404 response
    if not row:
        return {'error': 'Data not found'}

    # Otherwise, return the name and history data
    capitals, currency, language, religion = row
    return {'name': name, 'capitals': capitals, 'currency': currency, 'language': language, 'religion': religion}


@app.get('/planets')
async def get_all_planets():
    # Connect to the database
    conn = sqlite3.connect('blogs.db')
    c = conn.cursor()

    # Get all the planet data from the planets table
    c.execute('SELECT * FROM planets')
    rows = c.fetchall()

    # Close the connection
    conn.close()

    # Convert the rows into a list of dictionaries
    planets = []
    for row in rows:
        planet = {
            'name': row[1],
            'title': row[2],
            'description': row[3],
            'named': row[4],
            'diameter': row[5],
            'orbit': row[6],
            'day': row[7],
            'moons': row[8],
            'img1': row[9],
            'img2': row[10]
        }
        planets.append(planet)

    return planets