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

# Create the countries table if it does not exist
c.execute('''
    CREATE TABLE IF NOT EXISTS countries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        geography TEXT,
        government TEXT,
        history TEXT,
        general_facts TEXT
    )
''')

c.execute('''
    CREATE TABLE IF NOT EXISTS planets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        title TEXT,
        description TEXT,
        named TEXT,
        diameter TEXT,
        orbit TEXT,
        day TEXT,
        moons INTEGER,
        img1 TEXT,
        img2 TEXT
    )
''')
c.execute('''INSERT INTO "planets" ("id", "name", "title", "description", "named", "diameter", "orbit", "day", "moons", "img1", "img2") VALUES
(1, 'Mercury', 'MERCURY: THE CLOSEST TO THE SUN', 'Mercury is the closest planet to the sun and the smallest planet in the solar system — it is only a little larger than Earth''s moon. Mercury zips around the sun in only 88 days and because it is so close to our star (about two-fifths the distance between Earth and the sun). Mercury experiences dramatic changes in its day and night temperatures. Mercury temperatures can reach a scorching 840 F (450 C) in the day, which is hot enough to melt lead. Meanwhile, on the night side, temperatures drop to minus 290 F (minus 180 C). Mercury''s atmosphere is very thin and primarily composed of oxygen, sodium, hydrogen, helium and potassium. Because the atmosphere is so thin it cannot incoming meteors, its surface is therefore pockmarked with craters, just like our moon. Over its four-year mission, NASA''s MESSENGER spacecraft revealed incredible discoveries that challenged astronomers'' expectations. Among those findings was the discovery of water ice and frozen organic compounds at Mercury''s north pole and that volcanism played a major role in shaping the planet''s surface.', 'for the messenger of the Roman gods', '3,031 miles (4,878 km)', '88 Earth days', '58.6 Earth days', 0, './mercury-1.jpg', './mercury-2.jpg'),
(2, 'Venus', 'VENUS: EARTH''S TWIN', 'Venus is the second planet from the sun and is the hottest planet in the solar system. Its thick atmosphere is extremely toxic and composed of sulfuric acid clouds, the planet is an extreme example of the greenhouse effect. The average temperature on Venus'' surface is 900 F (465 C). At 92 bar, the pressure at the surface would crush and kill you. And oddly, Venus spins slowly from east to west, the opposite direction of most of the other planets. Venus is sometimes referred to as Earth''s twin as they are similar in size and radar images beneath its atmosphere reveal numerous mountains and volcanoes. But beyond that, the planets could not be more different. The Greeks believed Venus was two different objects — one in the morning sky and another in the evening. Because it is often brighter than any other object in the sky, Venus has generated many UFO reports.', 'for the Roman goddess of love and beauty', '7,521 miles (12,104 km)', '225 Earth days', '241 Earth days', 0, './venus-1.jpg', './venus-2.jpg'),
(3, 'Earth', 'EARTH: OUR HOME PLANET', 'Earth, our home planet, is the third planet from the sun. It is a water world with two-thirds of the planet covered by water. Earth''s atmosphere is rich in nitrogen and oxygen and it is the only world known to harbor life. Earth rotates on its axis at 1,532 feet per second (467 meters per second) — slightly more than 1,000 mph (1,600 kph) — at the equator. The planet zips around the sun at more than 18 miles per second (29 km per second).', 'originates from "Die Erde," the German word for "the ground."', '7,926 miles (12,760 km)', '365.24 Earth days', '23 hours 56 minutes', 1, './earth-1.jpeg', './earth-2.jpg'),
(4, 'Mars', 'MARS: THE RED PLANET', 'Mars is the fourth planet from the sun. It is a cold, desert-like planet covered in iron oxide dust that gives the planet its signature red hue. Mars shares similarities with Earth: It is rocky, has mountains, valleys and canyons, and storm systems ranging from localized tornado-like dust devils to planet-engulfing dust storms. Substantial scientific evidence suggests that Mars at one point billions of years ago was a much warmer, wetter world, rivers and maybe even oceans existed. Although Mars'' atmosphere is too thin for liquid water to exist on the surface for any length of time, remnants of that wetter Mars still exist today. Sheets of water ice the size of California lie beneath Mars'' surface, and at both poles are ice caps made in part of frozen water. Scientists also think ancient Mars would have had the conditions to support life like bacteria and other microbes. Hope that signs of this past life — and the possibility of even current lifeforms — may exist on the Red Planet has driven numerous Mars missions and the Red Planet is now one of the most explored planets in the solar system.', 'for the Roman god of war', '4,217 miles (6,787 km)', '687 Earth days', 'Just more than one Earth day (24 hours, 37 minutes)', 2, './mars-1.jpg', './mars-2.jpg'),
(5, 'Jupiter', 'JUPITER: THE LARGEST PLANET', 'Jupiter is the fifth planet from the sun and the largest planet in the solar system. The gas giant is more than twice as massive as all the other planets combined, according to NASA. Its swirling clouds are colorful due to different types of trace gases including ammonia ice, ammonium hydrosulfide crystals as well as water ice and vapor. A famous feature in its swirling clouds is Jupiter''s Great Red Spot, a giant storm more than 10,000 miles wide, first observed in 1831 by amateur astronomer Samuel Heinrich Schwabe. It has raged at more than 400 mph for the last 150 years, at least. Jupiter has a strong magnetic field, and with 75 moons, including the largest moon in the solar system, Ganymede.', 'for the ruler of the Roman gods', '86,881 miles (139,822 km)', '11.9 Earth years', '9.8 Earth hours', 53, './jupiter-1.jpg', './jupiter-2.jpg'),
(6, 'Saturn', 'SATURN: THE RINGED JEWEL', 'Saturn is the sixth planet from the sun and is famous for its large and distinct ring system. Though Saturn is not the only planet in the solar system with rings. When polymath Galileo Galilei first studied Saturn in the early 1600s, he thought it was an object with three parts: a planet and two large moons on either side. Not knowing he was seeing a planet with rings, the stumped astronomer entered a small drawing — a symbol with one large circle and two smaller ones — in his notebook, as a noun in a sentence describing his discovery. More than 40 years later, Christiaan Huygens proposed that they were rings. The rings are made of ice and rock and scientists are not yet sure how they formed. The gaseous planet is mostly hydrogen and helium and has numerous moons.', 'for Roman god of agriculture', '74,900 miles (120,500 km)', '29.5 Earth years', 'About 10.5 Earth hours', 53, './saturn-1.jpg', './saturn-2.jpg'),
(7, 'Uranus', 'URANUS: THE TILTED, SIDEWAYS PLANET', 'Uranus is the seventh planet from the sun and is a bit of an oddball. It has clouds made of hydrogen sulfide, the same chemical that makes rotten eggs smell so foul. It rotates from east to west like Venus. But unlike Venus or any other planet, its equator is nearly at right angles to its orbit — it basically orbits on its side. Astronomers believe an object twice the size of Earth collided with Uranus roughly 4 billion years ago, causing Uranus to tilt. That tilt causes extreme seasons that last 20-plus years, and the sun beats down on one pole or the other for 84 Earth-years at a time. The collision is also thought to have knocked rock and ice into Uranus'' orbit. These later became some of the planet''s 27 moons. Methane in Uranus'' atmosphere gives the planet its blue-green tint. It also has 13 sets of faint rings. Uranus holds the record for the coldest temperature ever measured in the solar system — minus 371.56 degrees F (minus 224.2 degrees C). The average temperature of Uranus is minus 320 degrees Fahrenheit (-195 degrees Celsius).', 'for the personification of heaven in ancient myth', '31,763 miles (51,120 km)', '84 Earth years', '18 Earth hours', 27, './uranus-1.jpg', './uranus-2.jpg'),
(8, 'Neptune', 'NEPTUNE: A GIANT, STORMY BLUE', 'Neptune is the eighth planet from the sun and is on average the coldest planet in the solar system. The average temperature of Neptune at the top of the clouds is minus 346 degrees Fahrenheit (minus 210 degrees Celsius). Neptune is approximately the same size as Uranus and is known for its supersonic strong winds. The planet is more than 30 times as far from the sun as Earth. Neptune was the first planet predicted to exist by using math, rather than being visually detected. Irregularities in the orbit of Uranus led French astronomer Alexis Bouvard to suggest some other planet might be exerting a gravitational tug. German astronomer Johann Galle used calculations to help find Neptune in a telescope. Neptune is about 17 times as massive as Earth and has a rocky core.', 'for the Roman god of water', '30,775 miles (49,530 km)', '165 Earth years', '19 Earth hours', 14, './neptune-1.jpg', './neptune-2.jpg'),
(9, 'Sun', 'THE SUN', 'The sun is by far the largest object in our solar system, containing 99.8% of the solar system''s mass. It sheds most of the heat and light that makes life possible on Earth and possibly elsewhere. Planets orbit the sun in oval-shaped paths called ellipses, with the sun slightly off-center of each ellipse. NASA has a fleet of spacecraft observing the sun, such as the Parker Solar Probe, to learn more about its composition, and to make better predictions about space weather and its effect on Earth.', 'In ancient times the Sun was widely seen as a god, and the name for Sun was the name of that god', '1.3927 million km', '240 million years', '36 Earth days', 8, './sun-1.jpg', './sun-2.jpg');''')
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
    # Execute the INSERT statement

# Commit the changes and close the connection
conn.commit()
conn.close()

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

def scrape_and_insert_data():
    url = 'https://www.tutorialspoint.com/general_knowledge/general_knowledge_countries_with_capitals.htm'
    response = requests.get(url)

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the table element by its class or ID
    table = soup.find('table', {'class': 'table'})

    # Extract the table headers
    headers = [th.text for th in table.select('th')]

    # Extract the table rows
    rows = []
    for row in table.select('tr')[1:]:
        row_data = [td.text for td in row.select('td')]
        rows.append(row_data)

    # Connect to the database
    conn = sqlite3.connect('blogs.db')
    c = conn.cursor()

    # Create the countries table if it does not exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS download (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            capitals TEXT,
            currency TEXT,
            language TEXT,
            religion TEXT
        )
    ''')

    # Insert the scraped data into the countries table
    for row in rows:
        name = row[0]
        capitals = row[1]
        currency = row[2]
        language = row[3]
        religion = row[4]

        # Execute the SQL INSERT statement
        c.execute('''
            INSERT INTO download (name, capitals, currency, language, religion)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, capitals, currency, language, religion))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

# Call the function to scrape and insert the data
scrape_and_insert_data()

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


