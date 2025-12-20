# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.6.0] - 2025-05-23

### Changed
- **UI Revamp:** Removed the redundant title bar and window controls from the main application window for a cleaner, focused look.
- **Style Cleanup:** Streamlined `css/styles.css` to remove unused classes related to the old title bar.

---

## [1.5.0] - 2025-05-22

### Added
- **Advanced Statistics Tracking:** Implemented a system to track user interaction efficiency.
- **Active Clicks:** Actions that successfully changed the game state.
- **Wasted Clicks:** Redundant actions (clicking flags, already revealed cells, etc.).
- **Categorized Metrics:** Stats are now broken down by Left Clicks, Right Clicks, and Chord Actions.
- **Results Table:** Integrated a detailed statistics table into the Win/Loss modal.

---

## [1.4.0] - 2025-05-21

### Added
- **Classic Dialog Modals:** Redesigned the "Game Over" and "Win" popups to mimic polished retro system dialog boxes.
- **Dynamic Icons:** Added context-specific icons (Information 'i' for wins, 'X' for losses) within the modals.
- **Improved Typography:** Refined font usage and spacing in system messages.

---

## [1.3.0] - 2025-05-20

### Added
- **Visual Feedback:** Tiles now show a "pressed" state (switching to `tile-revealed.png`) during active clicks and chording.
- **Mobile Interaction Support:** Implemented visual feedback for long-press and touch-down events.

### Fixed
- **Flag Protection:** Ensured that flagged tiles remain visually constant and are not affected by chord highlighting.

---

## [1.2.0] - 2025-05-19

### Added
- **Chording Mechanic:** Implemented the ability to reveal surrounding tiles by clicking a revealed number if the flag count matches.
- **Performance:** Optimized the flood-fill algorithm for revealing empty areas.

---

## [1.1.0] - 2025-05-18

### Added
- **Asset Preloading:** Integrated a preloading system to ensure images and fonts are ready before the game starts, preventing flickering.
- **Typography:** Integrated the 'Seven Segment' font for a more authentic LED counter look.

### Changed
- **Asset Refinement:** Updated tile and UI icons for better consistency.

---

## [1.0.0] - 2025-05-15

### Added
- **Core Mechanics:** Basic Minesweeper logic including grid generation, mine placement, and recursive reveal.
- **Retro UI:** Initial implementation of the classic Windows-style interface.
- **Difficulty Settings:** Beginner, Intermediate, and Expert presets.
