# Avoid development on platform

## Platform fragmentation
Each yearly iteration of Amazfit products ship with a different OS version, generating a huge fragmentation of the platform, making it impossible to support all the devices at once while being able to use the latest features.

[Here's every amazfit device and it's OS version](https://docs.zepp.com/docs/reference/related-resources/device-list/)

## Unfixeable bugs
On the first watch I developed the app for, an Amazfit Band 7, I noticed that the device became hugely unresponsive to the point of sometimes not turning the screen on at all, I believe these might have been caused by a memory leak in one of the previous versions of the app, that never got away.

Factory resetting the device didn't fix the issue, and when I asked for help on the official channel I was told _How much you pay for is what you get_ and nothing else.


## Conclusion
I believe that while the platform can be a good starting point for people to get into development, it's not a good idea to develop a full fledged app for it, as it's not a stable platform and the manufacturer doesn't support (you) the developer. Open sourcing the operating system would be a good idea, but I don't think it will ever happen.
