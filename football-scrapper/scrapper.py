from selenium import webdriver
from selenium.webdriver.common.by import By
import json

clubs_list = {
    'Premier League': [
        'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton And Hove Albion', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Leeds United', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United', 'Nottingham Forest', 'Southampton', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton Wanderers'
    ]
}
goalkeeper_header_names = ['POS', 'GP', 'GS', 'CS',
                           'SV', 'GA', 'A', 'PAcc', 'FC', 'FA', 'YC', 'RC']
outfield_header_names = ['POS', 'GP', 'GS', 'G', 'A', 'SH',
                         'SOT', 'PAcc', 'TkIW', 'INT', 'FC', 'FA', 'YC', 'RC']

def startDriver():
    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome()
    full_players_list = []
    for league in clubs_list:
        for club in clubs_list[league]:
            process_rows_for_club(club, league, full_players_list, driver)
        export_to_json(full_players_list, league)
    driver.quit()


def process_rows_for_club(club, league, full_players_list, driver):
    formatted_club = '-'.join(club.split(' '))
    club_url = 'https://theathletic.com/football/team/' + formatted_club + '/stats/'
    driver.get(club_url)
    rows = driver.find_elements(by=By.TAG_NAME, value='tr')
    driver.implicitly_wait(1)
    for row in rows:
        current_row = []
        for cell in row.find_elements(by=By.TAG_NAME, value="td"):
            current_row.append(cell.text)
        if (len(current_row) != 0):
            name = current_row[0].split('\n')[0]
            current_player = {'name': name}
            if (current_row[1] == 'GK'):
                for col in range(len(goalkeeper_header_names)):
                    current_player[goalkeeper_header_names[col]
                                   ] = current_row[col+1]
            else:
                for col in range(1, len(outfield_header_names)):
                    current_player[outfield_header_names[col]
                                   ] = current_row[col+1]
            current_player['club'] = club
            current_player['league'] = league
            full_players_list.append(current_player)


def export_to_json(output, league):
    path = '/Users/chunyang/desktop/personal-projects/basketball-scrapper/' + ('_').join(league.split(' ')) + '.json'
    with open(path, 'w') as f:
        json.dump(output, f)


startDriver()
