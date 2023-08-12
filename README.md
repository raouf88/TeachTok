# Features

Implement the “Home” screen of a TikTok clone for education based on this [Figma prototype](https://www.figma.com/proto/Q6mHDKGcGAZtJAUAZ50pww/TeachTok-Assessment?page-id=0%3A1&type=design&node-id=1-3227&viewport=1049%2C687%2C0.21&scaling=contain&starting-point-node-id=1%3A3227)

- Showing content for the “Following” and “For you” sections of the “Home” screen
- Displaying two types of content: Flashcards and Multiple Choice Questions (MCQs)
- Showing the content’s user name, user icon, and content description
- Browsing through content in an infinite scroll fashion (like TikTok)
- Making the countdown timer at the top left measure the time the user spent in the app

# Notes

## Usage Timer

- The requirements for the usage timer could be clearer, so for now, I've implemented a simple version. It can be enhanced further by making it track time even after the app is closed and to count its usage across the entire app, not just the home page.

## Comment Icon

- The comment icon is causing a minor hiccup as I try to extract it as an SVG. There's a missing dot issue. I'll reach out to the designer for an alternative version that works seamlessly.

## Black Highlight Effect

- Achieving the sleek black highlight effect with curved corners on questions is a bit of a puzzle. While it could take some time, I've decided to set it aside for now. I'll have a discussion with the product manager to determine if investing effort into this small feature is worthwhile.

## Text stroke in React Native

- Text stroke, outline, and order can be a bit tricky in React Native. My current solution is simple and might be sufficient. I'm cautious about other workarounds potentially causing more problems.

## Thumb Animation

- Currently, the thumb animation is based on a GIF from the Figma design. switching to Lottie is more recommended way but requires coordination with the designer.

## Handling Long Text and Fetching States

- I haven't tackled the situation where text in flash cards gets too long and overflows the area. This calls for some designer magic to decide how it should appear.

## Fetching States

- I didn't dive into setting up error handling, retrying, or managing loading states for fetching data from the backend. It felt a bit beyond the scope of this assessment.
