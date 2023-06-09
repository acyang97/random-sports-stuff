from selenium import webdriver
from selenium.webdriver.common.by import By
import json
from selenium.webdriver.support import expected_conditions as EC
import multiprocessing
import time

PREMIER_LEAGUE_TOP_SCORERS = [
    ("Erling Haaland", "Manchester City"),
    ("Harry Kane", "Tottenham Hotspur"),
    ("Ivan Toney", "Brentford"),
    ("Mohamed Salah", "Liverpool"),
    ("Callum Wilson", "Newcastle"),
    ("Marcus Rashford", "Manchester United"),
    ("Martin Ødegaard", "Arsenal"),
    ("Ollie Watkins", "Aston Villa"),
    ("Gabriel Martinelli", "Arsenal"),
    ("Bukayo Saka", "Arsenal"),
    ("Aleksandar Mitrović", "Fulham"),
    ("Rodrigo", "Leeds United"),
    ("Harvey Barnes", "Leicester City"),
    ("Gabriel Jesus", "Arsenal"),
    ("Phil Foden", "Manchester City"),
    ("Roberto Firmino", "Liverpool"),
    ("Miguel Almirón", "Newcastle"),
    ("James Maddison", "Leicester City"),
    ("Heung-min Son", "Tottenham Hotspur"),
    ("Eberechi Eze", "Crystal Palace"),
    ("Alexis Mac Allister", "Brighton And Hove Albion"),
    ("Taiwo Awoniyi", "Nottingham Forest"),
    ("Alexander Isak", "Newcastle"),
    ("Bryan Mbeumo", "Brentford"),
    ("Pascal Groß", "Brighton And Hove Albion")
]

matchdays = [
    '2022-08-06',  # 1
    '2022-08-13',  # 2
    '2022-08-20',  # 3
    '2022-08-27',  # 4
    '2022-08-31',  # 5
    '2022-09-04',  # 6
    '2022-09-10',  # 7
    '2022-09-16',  # 8
    '2022-10-01',  # 9
    '2022-10-08',  # 10
    '2022-10-14',  # 11
    '2022-10-19',  # 12
    '2022-10-22',  # 13
    '2022-10-29',  # 14
    '2022-11-05',  # 15
    '2022-11-12',  # 16
    '2022-12-26',  # 17
    '2022-12-30',  # 18
    '2023-01-02',  # 19
    '2023-01-13',  # 20
    '2023-01-21',  # 21
    '2023-02-03',  # 22
    '2023-02-11',  # 23
    '2023-02-18',  # 24
    '2023-02-24',  # 25
    '2023-03-04',  # 26
    '2023-03-11',  # 27
    '2023-03-17',  # 28
    '2023-04-01',  # 29
    '2023-04-08',  # 30
    '2023-04-15',  # 31
    '2023-04-21',  # 32
    '2023-04-25',  # 33
    '2023-04-29',  # 34
    '2023-05-06',  # 35
    '2023-05-13',  # 36
    '2023-05-20',  # 37
    '2023-05-28',  # 38
]
# top_scorer_rankings = {}
# for player in PREMIER_LEAGUE_TOP_SCORERS:
#     top_scorer_rankings[player[0]] = 0
            
full_data_list = []
# def cpu_bound(number):
#     return sum(i * i for i in range(number))
def cpu_bound(matchday):
    startDriver(matchday)

# def find_sums(numbers):
#     with multiprocessing.Pool() as pool:
#         pool.map(cpu_bound, numbers)

def get_data(matchdays):
    with multiprocessing.Pool() as pool:
        pool.map(cpu_bound, matchdays)
        
def export_to_json(output):
    path = '/Users/chunyang/desktop/personal-projects/random-sports-stuff/football-scrapper/top-scorers.json'
    with open(path, 'w') as f:
        json.dump(output, f)
def export_to_json_by_matchday(output, matchday):
    path = '/Users/chunyang/desktop/personal-projects/random-sports-stuff/football-scrapper/matchday-' + str(matchday)
    with open(path, 'w') as f:
        json.dump(output, f)
        
# if __name__ == "__main__":
#     # 38 matchdays
#     matchdays = [1 + x for x in range(38)]
#     start_time = time.time()
#     get_data(matchdays)
#     duration = time.time() - start_time
#     # Save data to a json file
#     export_to_json(full_data_list)
#     print(f"Duration {duration} seconds")
    
top_scorer_rankings = {}
for player in PREMIER_LEAGUE_TOP_SCORERS:
    top_scorer_rankings[player[0]] = 0
def startDriver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    options.add_experimental_option("prefs", {"profile.default_content_setting_values.cookies": 2})
    options.add_experimental_option("excludeSwitches", ["disable-popup-blocking"])
    driver = webdriver.Chrome(options=options)
    for i in range(len(matchdays)):
        get_data_for_current_matchday(i, driver)
    # Save data to a json file
    export_to_json(full_data_list)
    driver.quit()

def get_data_for_current_matchday(i, driver):
    current_list = []
    index = i+1
    url = 'https://www.transfermarkt.com/premier-league/spieltag/wettbewerb/GB1/saison_id/2022/spieltag/' + str(index)
    matchday_date = matchdays[i]
    driver.get(url)
    driver.switch_to.frame('sp_message_iframe_764226')
    accept_button = driver.find_element(by=By.XPATH, value='/html/body/div/div[2]/div[3]/div[2]/button')
    accept_button.click()
    driver.switch_to.default_content()

    driver.implicitly_wait(5)
    # Now for each url, i need to look through each index
    div = driver.find_element(by=By.XPATH, value='//*[@id="main"]/main/div[2]/div[1]')
    goal_scorers = div.find_elements(by=By.TAG_NAME, value="td")
    # top_scorer_rankings = {}
    # for player in PREMIER_LEAGUE_TOP_SCORERS:
    #     top_scorer_rankings[player[0]] = 0
    for row in goal_scorers:
        if row.text == None:
            continue
        for player in top_scorer_rankings:
            if player in row.text:
                top_scorer_rankings[player] += 1
    # Now i got the list for the data, I need to add the club, date and add it to full_data_list
    for player in PREMIER_LEAGUE_TOP_SCORERS:
        data_to_add = {}
        data_to_add['date'] = matchday_date
        data_to_add['name'] = player[0]
        data_to_add['club'] = player[1]
        data_to_add['value'] = top_scorer_rankings[player[0]]
        data_to_add['matchday'] = index
        full_data_list.append(data_to_add)
        current_list.append(data_to_add)
    export_to_json_by_matchday(current_list, index)
    print(current_list)
    
# startDriver()

startDriver()