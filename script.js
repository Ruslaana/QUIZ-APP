document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quiz-form');
  const shuffleButton = document.getElementById('shuffle-options');
  const optionsContainer = document.getElementById('options-container');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const optionsInputs = document.querySelectorAll('.option-input');
    const radios = document.querySelectorAll('.correct-radio');

    let correctIndex = null;
    const options = [];

    optionsInputs.forEach((input, index) => {
      const isCorrect = radios[index].checked;
      options.push({ text: input.value, isCorrect });
      if (isCorrect) correctIndex = index;
    });

    if (correctIndex === null) {
      alert('Please select a correct answer!');
      return;
    }

    const quizQuestion = {
      id: Date.now(),
      question,
      options,
    };

    console.log('Quiz Question Saved:', quizQuestion);
    alert('Question saved successfully!');
    form.reset();
  });

  shuffleButton.addEventListener('click', () => {
    const optionGroups = Array.from(optionsContainer.children);
    const shuffled = optionGroups.sort(() => Math.random() - 0.5);

    optionsContainer.innerHTML = '';
    shuffled.forEach(group => optionsContainer.appendChild(group));
  });

  optionsContainer.addEventListener('change', () => {
    const radios = document.querySelectorAll('.correct-radio');
    radios.forEach((radio, index) => {
      const optionInput = radio
        .closest('.option-group')
        .querySelector('.option-input');
      if (radio.checked) {
        optionInput.classList.add('correct');
        optionInput.classList.remove('incorrect');
      } else {
        optionInput.classList.add('incorrect');
        optionInput.classList.remove('correct');
      }
    });
  });
});
