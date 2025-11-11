# Group Organiser Schema Update

**Date:** November 11, 2024  
**Purpose:** Add new fields to support group organiser pages that reference master holidays and specific events

## Backups Created

- Individual schema backups in source directories (timestamped)
- Compressed archive: `backups/group-organiser-schema-backup-[timestamp].tar.gz`

## Changes Made

### 1. Group Organiser Schema

Added these new fields:
- `organiserName` (string, required) - Name of the group organiser
- `organiserDescription` (richtext) - Bio/description
- `organiserImage` (media) - Profile image or logo
- `whatsappGroup` (string) - WhatsApp group URL
- `masterHoliday` (relation oneToOne) - References main holiday template
- `events` (relation manyToMany) - Selected events to display

### 2. Event Schema

Added inverse relation:
- `groupOrganisers` (relation manyToMany) - Tracks group organisers

## URL Structure

- Master Holiday: `/tennis-holiday/adult-tennis-holiday-5-sani-beach-hotel`
- Group Organiser: `/group-organiser/david-lloyd-hull`

## Next Steps

1. Restart Strapi: `npm run develop`
2. New fields will appear in Group Organiser content type
3. Test by creating a group organiser and linking to master holiday

See full documentation for detailed usage instructions.
