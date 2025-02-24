# Meetup_Project.github.io

# Event Filtering Website

## Project Description

This project is a web application for searching and filtering events. Users can view events and filter them by date, event type, distance, and category.

## Development Process

### 1. Implementing the Main Page (Responsive Design):

- Navbar
- Main section
- Footer

### 2. Implementing the Filtering Page (Responsive Design):

- Navbar
- Main section
- Footer

### 3. Adding Filtering Functionality:

- Filter by date
- Filter by event type
- Filter by distance
- Filter by category

## Technologies Used

- HTML
- CSS (SCSS)
- JavaScript
- Google Fonts (Roboto)

## Resources

- Project layout
- Mock data for testing

### Example Event Data:

```javascript
const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title: "NYC AI Users - AI Tech Talks, Demo & Social",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
];
```

## Event Filtering

Users can filter events by:

- **Category:** Social Activities, Hobbies and Passions, Health and Wellbeing, Business, Technology
- **Distance (for offline events):** 5 km, 10 km, 15 km, 25 km, 50 km, 75 km, 100 km
- **Event Type:** Online, Offline
- **Date:** Filter by specific days

## Requirements

- Use **Roboto** font from Google Fonts
- Clicking the **Join Meetup** button redirects the user to "Events near New York, NY"
- Implement only the filtering functionality
- The website must be responsive
- Clicking the logo (top-left navbar) redirects to the main page

## How to Run

1. Clone the repository:

```sh
git clone https://github.com/your-repository-link.git
```

2. Open `index.html` in a browser
3. Done!

---

Developed for educational purposes.