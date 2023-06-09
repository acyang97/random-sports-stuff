## Random Sports Stuff

Site: https://random-sports-stuff.vercel.app/

Just an app for me to learn new stuff while continuing to hunt for a job. I decided to play around more data from sports since I'm a sports addict. Below are some logs of what I did. I'm hoping to learn something new and get something done with it once or twice a week at least. Lets see how long this can last lmao.

### 8 June 2023:

- Built a page where I can select football players and compare their stats such as goals scored, assists, shots on target, etc
- Data was scrapped using Selenium, learning how to scrap data was something new to me
- Learnt and used D3 for data visualization.
- First time using Vite, I'm impressed by it.

### 9-10 June 2023:

- Learnt more about scrapping
- The page where I want to scrap data required users to accept privacy policy, and this popup blocks the content of the actual page and I wasn't able to scrap any data. Learnt that to resolve this, it is possible to switch to the iframe of the popup so that we can click the button to accept the privacy policy, and continue with our stuff.
```
driver.switch_to.frame('ID_OF_IFRAME')
accept_button = driver.find_element(by=By.XPATH, value='X_PATH_OF_ELEMENT')
accept_button.click()
driver.switch_to.default_content()
```
- I did not realized that the scrapping of data was so slow as I was just Netflixing and letting the python script run. Looked up on how to improve on this, and realizedI could have utilized the concept of concurrency. Might try rewrite the script and apply those techniques in the future.

https://github.com/acyang97/random-sports-stuff/assets/59875458/318dbdc7-7bd7-416f-8ca5-cc47c7fc5ea8


