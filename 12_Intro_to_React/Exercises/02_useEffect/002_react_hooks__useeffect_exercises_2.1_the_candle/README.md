# The Candle

**Objective:**

Learn how to control when an effect runs with  `useEffect` based on it's dependency array, and demonstrate the the purpose of a cleanup function.

**Instructions:**

We want this candle to reduce its height as time passes. We have a height state that we use to set the height of our candle. Change the initial value of height to see it's effect on the candle. 

We want to let an effect control this of course.

- Create a useEffect in the Candle component
- Inside of your useEffect's callback, use a setTimeout to decrease your height state by 10 after 2 seconds
- Update your dependency array so that your effect will run again every time height changes
- You may notice that the candle is becoming a bit chaotic. This is because every time the effect runs again, an additional timeout is created. Use a cleanup function to clear each timeout.
- Because fire is dangerous, if the height is less than or equal to 10, reset it to the initial state value
- Infinite candles :D
