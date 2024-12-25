let quizQuestions = [];
let questionId = 1;

const form = document.getElementById('quiz-form');
form.addEventListener('submit', e => {
  e.preventDefault();

  const questionText = document.getElementById('question').value;
  const optionInputs = document.querySelectorAll('.option-input');
  const correctAnswer = document.querySelector('input[name="correct"]:checked');

  if (!questionText || questionText.length > 140 || !correctAnswer) {
    alert('Please enter a valid question and mark a correct answer!');
    return;
  }

  const options = Array.from(optionInputs).map((input, index) => ({
    text: input.value,
    isCorrect: correctAnswer.value == index,
  }));

  const quizQuestion = {
    id: questionId++,
    question: questionText,
    options: options,
  };

  quizQuestions.push(quizQuestion);
  form.reset();
  renderQuizQuestions();
});

function renderQuizQuestions() {
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = ''; 

  quizQuestions.forEach(quiz => {
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-item';

    const questionText = document.createElement('h3');
    questionText.textContent = quiz.question;

    const optionsList = document.createElement('ul');
    quiz.options.forEach(option => {
      const optionItem = document.createElement('li');
      optionItem.textContent = option.text;
      optionsList.appendChild(optionItem);
    });

    const revealButton = document.createElement('button');
    revealButton.textContent = 'Show Correct Answer';
    revealButton.addEventListener('click', () => {
      const correctOption = quiz.options.find(opt => opt.isCorrect);
      alert(`Correct Answer: ${correctOption.text}`);
    });

    questionElement.appendChild(questionText);
    questionElement.appendChild(optionsList);
    questionElement.appendChild(revealButton);
    questionsList.appendChild(questionElement);
  });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredQuestions = quizQuestions.filter(quiz =>
    quiz.question.toLowerCase().includes(query),
  );
  renderFilteredQuestions(filteredQuestions);
});

function renderFilteredQuestions(filteredQuestions) {
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = ''; 

  filteredQuestions.forEach(quiz => {
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-item';

    const questionText = document.createElement('h3');
    questionText.textContent = quiz.question;

    const optionsList = document.createElement('ul');
    quiz.options.forEach(option => {
      const optionItem = document.createElement('li');
      optionItem.textContent = option.text;
      optionsList.appendChild(optionItem);
    });

    const revealButton = document.createElement('button');
    revealButton.textContent = 'Show Correct Answer';
    revealButton.addEventListener('click', () => {
      const correctOption = quiz.options.find(opt => opt.isCorrect);
      alert(`Correct Answer: ${correctOption.text}`);
    });

    questionElement.appendChild(questionText);
    questionElement.appendChild(optionsList);
    questionElement.appendChild(revealButton);
    questionsList.appendChild(questionElement);
  });
}
