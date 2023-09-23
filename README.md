# ZeppOS-Spotify
Spotify manager for ZeppOS using Console api calls 

![player](https://user-images.githubusercontent.com/62400508/219872494-9af74f2c-5053-448b-93b6-92e3d3ebfbf0.png)
![player](https://user-images.githubusercontent.com/62400508/219872502-7ebde99c-2596-4136-b21f-faadb2ba2f18.png)

# How to use

## Requirements

* [Node.js](https://youtu.be/MrJkkG-yt7A?t=23)
* [ZeusCLI](https://docs.zepp.com/docs/guides/tools/cli/#installing-the-zeus-cli)
* __Spotify premium account__
* The zepp account you are using must be directly registered (no google, mi fit, etc login).

## Installation process

#### 1. Go to [Spotify dashboard for developers](https://developer.spotify.com/dashboard/applications) and select "create an app".

#### 2. Click on "Show client secret" to see both your client id and secret.
![image](https://user-images.githubusercontent.com/62400508/218193119-a8d260e2-8ba9-4441-87d8-0cfa81d44344.png)

#### 3. Select Edit Settings, then paste the following URI as shown on 'Redirect URIs' then save
`http://zepp-os-staging.zepp.com/app-settings/v1.0.0/index.html?appId=1017560`

![image](https://user-images.githubusercontent.com/62400508/218193247-40511909-9e62-4122-a704-067f32d4a815.png)
![image](https://github.com/juan518munoz/ZeppOS-Spotify/assets/62400508/1a5c386b-03e2-45da-9390-4f86aee9a2ce)
![image](https://user-images.githubusercontent.com/62400508/218193505-9808331f-9a60-4bb9-930c-423e8d2b83de.png)

#### 4. Download the repository as a zip file
![image](https://user-images.githubusercontent.com/62400508/218191548-60a85e03-a04d-4614-ba88-cd47e46bbc70.png)

#### 5. Extract it's folder to the desktop
![image](https://user-images.githubusercontent.com/62400508/218191809-8ee83c3a-ce5d-4f32-9a9c-110cf9309d11.png)

#### 6. From the main directory go to utils, then config, right click on client.js and open it with any text editor
![image](https://user-images.githubusercontent.com/62400508/218192244-e9775779-ce6b-40c1-8dd9-958639c72444.png)

#### 7. Paste your `client id` and `client secret` accordingly then save the file
![image](https://user-images.githubusercontent.com/62400508/218193819-23b1dc9c-14bb-4a46-93a6-accf605272ff.png)

#### 8. Go back to the main directory, then right click on any empty space to open Windows Terminal
![image](https://user-images.githubusercontent.com/62400508/218194401-edd87cf2-accc-4aed-a064-bbe2913c29ea.png)

#### 9. Run `zeus preview` on the terminal, and select the device to build for
![image](https://user-images.githubusercontent.com/62400508/218194662-457b8f27-42af-4070-a187-0338cd1b0cca.png)

#### 8. Enable developer mode on the Zepp App then scan the generated QR, go to the app settings to log in
![device](https://user-images.githubusercontent.com/62400508/218196156-f082b4bd-3802-4696-b3cd-37cb2e704392.png)

#### If you see your user info on screen you are all set, enjoy the app!

Important note: the log in process may sometimes fail retrieving user information, if this happens to you log out then log in again 

(if you see User: fail you are also logged, it's just the user info that's displayed wrongly)

# More screenshots

![library](https://user-images.githubusercontent.com/62400508/219872523-a98ad1d2-562d-451a-98ea-163b538fee9e.png)
![playlist](https://user-images.githubusercontent.com/62400508/219872527-62458c29-d42a-4e36-bb82-5c29ed638a8d.png)
![zepp_screenshot_1676339827656](https://user-images.githubusercontent.com/62400508/219872568-35f91900-1e6f-4533-97c2-117754ef31a5.png)



