events
======

### Objective

Build a small **uncontrolled mini-survey form** and practice attaching event handlers and inline validation **without using React state**.

### Instructions

#### Click Event

*   Create a button element, and add a click event handler to show an alert with a message of your choice when clicked.
    

#### Change Event

*   Create a text input, and add a change event handler to log the current value of the input. If the input's value is equal to "secretcodeunlocked", show an alert with a secret message of your choice

#### Submit Event

*   **Add Elements**: Inside the `App` component, create a `<form>` that contains:
    
    *   **Name** – text input
        
    *   **Email**– text input (we will validate with JS)
        
    *   **Message** – textarea
        
    *   **Submit** button
        

*   **Labels:** Inputs should have labels for accessibility.
*   **Assign Events**: Attach a single `handleSubmit` function to the form’s `onSubmit` event.
    
*   **Implement the Handler**:
    
    *   Call `event.preventDefault()`.
        
    *   Read the field values via `event.target.elements` , you can pass a `name` attribute to your inputs and even the button so you can access them by name, e.g. `event.target.elements.email`or `event.target.elements.message`
        
    *   `console.log()` an object containing all collected values.
        
    *   Show `alert("Thanks for completing the survey!")`.
        
    *   Reset the form
        
*   **Add validation** 
    *   Validate inside the handler (JavaScript Form Validation)
        
        *   Name is not empty
        *   Name must be at least **2 characters** long.
            
        *   Email is not empty
        *   Email must include the `@` character
            
        *   Message must not be empty
        *   Message must be at least 5 characters long.
    *   If any validation fails:
        
        *   Show an alert with sensible feedback.
            

*   **Bonus**: Disable the button as soon as possible within from within the submit handler. If validations fail, re-enable it for subsequent submissions. If validations succeed, set a timer for **3 seconds** before re-enabling it (use `setTimeout`) to simulate processing.