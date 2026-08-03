conditional rendering
=====================

#### Objective

In this exercise, you will learn how to use conditional rendering in React. We will build on top of the student card, adding some extra properties. We will then render different UI elements, based on these values.

#### Instructions

*   **Bring over your Student component**
    
    *   Recycle your `Student` component and bring it over.
        
*   **Our conditions:**
    *   **Graduate**: Based on the value of graduate, show whether the student is actively enrolled or already graduated.
    *   **GPA (Grade Point Average)**: Render the appropriate grade, e.g. if GPA is 95, the correct value is A. If the student has an `F`, you should also conditionally style the text to be red. For this one, we recommend you create a `Grade` component
        *   A+ 97-100
        *   A 93-96
        *   A- 90-92
        *   B+ 87-89
        *   B 83-86
        *   B- 80-82
        *   C+ 77-79
        *   C 73-76
        *   C- 70-72
        *   D+ 67-69
        *   D 63-66
        *   D- 60-62
        *   F 0-59