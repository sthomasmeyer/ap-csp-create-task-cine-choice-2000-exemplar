// Use this list to collect user-inputted data that will lead to a final...
// 2000s era movie recommendation.
var userChoices = [];

// Option #1: Rating
onEvent('ratingConfirmBtn', 'click', function () {
  appendItem(userChoices, getText('ratingDropdown'));
  setScreen('originCountryScreen');
});

// Option #2: Country of Origin
onEvent('originCountryConfirmBtn', 'click', function () {
  appendItem(userChoices, getText('originCountryDropdown'));
  setScreen('releaseYearScreen');
});

// Option #3: Release Year
onEvent('releaseYearConfirmBtn', 'click', function () {
  appendItem(userChoices, getText('releaseYearDropdown'));
  generateAndDisplayFinalRecs(userChoices);
  setScreen('finalRecScreen');
});

// Generate (+) Display Final Recommendation(s)
function generateAndDisplayFinalRecs(listOfChoices) {
  readRecords(
    'Netflix Content',
    {
      Rating: listOfChoices[0],
      Country: listOfChoices[1],
      'Release Year': +listOfChoices[2]
    },
    function (records) {
      var finalRecommendation;
      var randomIndex = randomNumber(0, records.length - 1);

      for (var i = 0; i < records.length; i++) {
        if (i == randomIndex) {
          finalRecommendation = records[i];
        }
      }

      if (finalRecommendation) {
        setText(
          'finalRecDisplay',
          finalRecommendation.Title +
            ' (' +
            finalRecommendation['Release Year'] +
            ') '
        );
      } else {
        setText(
          'finalRecDisplay',
          'There is nothing on Netflix that meets your selected criteria.'
        );
      }
    }
  );
}

// Give users an opportunity to restart the process and generate another recommendation.
onEvent('tryAgainBtn', 'click', function () {
  userChoices = [];
  setScreen('homeScreen');
  setText('finalRecDisplay', '');
});
