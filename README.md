# React + TypeScript + Vite

React, Express app for generating fake user data, including ID, name, address, and phone number. The application supports three localization zones. It introduces generator errors ranging from 0 to 1000 for each string. The seed is used to ensure stable randomization.
Implement a Web-application for the fake (random) user data generation.

## The single app page allows to:
1) select region ( 3 different)
2) specify the number of error per record (two “linked” controls — slider 0..10 + binded number field with max value limit at least 1000)
3) define seed value and [Random] button to generate a random seed

If the user change anything, the table below automatically updates (20 records are generated again).

Support infinite scrolling in the table (you show 20 records and if the user scroll down, you add next 10 records below — add new so called "page" = "batch of records").

The table show contain the following fields:
1) Index (1, 2, 3, ...) — no errors here
2) Random identifier — no errors here
3) Name + middle name + last name (in region format)
4) Address 
5) Phone 

## Support 3 type of errors 
- delete character in random position, add random character (from a proper alphabet) in random position, swap near characters. Type of the error have to be chosen randomly with equal probabilities (when user specifies 1000 errors, "noisy user data" should not be too long or too short).



