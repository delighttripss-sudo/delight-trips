# Copilot Instructions for Delight Trips Codebase

Welcome to the Delight Trips codebase! This document provides essential guidelines for AI coding agents to be productive and effective contributors to this project. Please follow these instructions to ensure consistency and alignment with the project's architecture and conventions.

## Project Overview

Delight Trips is a travel-focused web application with the following structure:

- **Frontend**: Static HTML files for pages (e.g., `index.html`, `about.html`, `tours.html`).
- **Assets**: Contains fonts, icons, images, patterns, and videos.
- **Configurations**: JavaScript files in `config/` for environment settings, navigation, SEO, and site-wide configurations.
- **Data**: Placeholder for structured data files.
- **Itineraries**: HTML files for various travel packages, organized by destination and duration.
- **Tours**: Placeholder for tour-related content.

## Key Conventions

1. **HTML Structure**:
   - Pages are static and follow semantic HTML5 conventions.
   - Reusable components (e.g., headers, footers) are likely in `partials/`.

2. **Configuration Files**:
   - `config/env.config.js`: Environment-specific settings.
   - `config/navigation.config.js`: Defines navigation structure.
   - `config/seo.config.js`: SEO metadata for pages.
   - `config/site.config.js`: General site-wide settings.

3. **Assets**:
   - Organized by type (e.g., `fonts/`, `icons/`, `images/`).
   - Follow naming conventions for clarity (e.g., `logo.png`, `background-pattern.svg`).

4. **Itineraries**:
   - Named using the format `<destination>-<duration>-itinerary.html`.
   - Example: `andaman-5n-6d-itinerary.html` for a 5-night, 6-day Andaman trip.

## Developer Workflows

### Adding a New Itinerary

1. Create a new HTML file in the `itineraries/` directory.
2. Follow the naming convention: `<destination>-<duration>-itinerary.html`.
3. Use existing itineraries as templates for structure and style.

### Updating Navigation

1. Modify `config/navigation.config.js` to add or update navigation links.
2. Ensure the link structure matches the corresponding HTML file.

### SEO Updates

1. Update `config/seo.config.js` for page-specific metadata.
2. Verify that the metadata aligns with the content of the corresponding HTML file.

## Integration Points

- **Cross-Component Communication**:
  - Configurations in `config/` are central to the site's functionality.
  - Ensure changes in `config/` files are reflected in the corresponding HTML pages.

- **External Dependencies**:
  - No external dependencies are explicitly defined in the current structure.
  - Verify with the user before introducing new dependencies.

## Examples

### Adding a New Destination

1. Add a new folder under `destinations/` (e.g., `destinations/adventure/`).
2. Populate it with relevant content (e.g., images, descriptions).
3. Update navigation and SEO configurations.

### Referencing Assets

Use relative paths to reference assets. For example:

```html
<img src="assets/images/destination.jpg" alt="Destination" />
```

## Notes

- Avoid introducing dynamic frameworks unless explicitly requested.
- Maintain consistency with the existing file structure and naming conventions.
- Document any significant changes in a `CHANGELOG.md` file (if created).

For further clarification, consult the user or refer to existing files as examples.
