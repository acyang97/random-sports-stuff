import json

def get_players():
    f = open('Premier_League.json')
    data = json.load(f)
    ls = []
    for player in data:
        ls.append(player['name'])
    export_to_json(ls)
    f.close()

def export_to_json(output):
    path = '/Users/chunyang/desktop/personal-projects/random-sports-stuff/football-scrapper/players.json'
    with open(path, 'w') as f:
        json.dump(output, f)
        
get_players()