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

  const options = [...optionInputs].map((input, index) => ({
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

async function fetchQuizQuestions() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Ruslaana/Ruslaana.github.io/refs/heads/main/quizeApp.json',
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      quizQuestions = data;
      renderQuizQuestions(); // Рендеримо питання після завантаження
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
  }
}

function renderQuizQuestions() {
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = '';

  quizQuestions.forEach(quiz => {
    const questionElement = document.createElement('div');
    questionElement.className = 'quiz-item';

    const questionText = document.createElement('h3');
    questionText.textContent = quiz.question;

    const optionsList = document.createElement('ul');
    quiz.options.forEach((option, index) => {
      const optionItem = document.createElement('li');
      const optionRadio = document.createElement('input');
      optionRadio.type = 'radio';
      optionRadio.name = `correct-${quiz.id}`;
      optionRadio.value = index;
      optionItem.appendChild(optionRadio);

      optionItem.appendChild(document.createTextNode(option.text));
      optionItem.dataset.index = index;
      optionsList.appendChild(optionItem);
    });

    const revealButton = document.createElement('button');
    revealButton.textContent = 'Show Correct Answer';
    revealButton.addEventListener('click', () => {
      quiz.options.forEach((option, index) => {
        const optionItem = optionsList.children[index];
        if (option.isCorrect) {
          optionItem.style.color = 'green';
        } else {
          optionItem.style.color = 'red';
        }
      });
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
    quiz.options.forEach((option, index) => {
      const optionItem = document.createElement('li');
      const optionRadio = document.createElement('input');
      optionRadio.type = 'radio';
      optionRadio.name = `correct-${quiz.id}`;
      optionRadio.value = index;
      optionItem.appendChild(optionRadio);

      optionItem.appendChild(document.createTextNode(option.text));
      optionItem.dataset.index = index;
      optionsList.appendChild(optionItem);
    });

    const revealButton = document.createElement('button');
    revealButton.textContent = 'Show Correct Answer';
    revealButton.addEventListener('click', () => {
      quiz.options.forEach((option, index) => {
        const optionItem = optionsList.children[index];
        if (option.isCorrect) {
          optionItem.style.color = 'green';
        } else {
          optionItem.style.color = 'red';
        }
      });
    });

    questionElement.appendChild(questionText);
    questionElement.appendChild(optionsList);
    questionElement.appendChild(revealButton);
    questionsList.appendChild(questionElement);
  });
}

const shuffleButton = document.getElementById('shuffle-options');
shuffleButton.addEventListener('click', () => {
  const optionsContainer = document.getElementById('options-container');
  for (let i = optionsContainer.children.length; i >= 0; i--) {
    optionsContainer.appendChild(
      optionsContainer.children[(Math.random() * i) | 0],
    );
  }
});

document.getElementById('start-quiz').addEventListener('click', () => {
  const player1Name = document.getElementById('player1-name').value;
  const player2Name = document.getElementById('player2-name').value;
  if (player1Name && player2Name) {
    document.getElementById('player1-display').textContent = player1Name;
    document.getElementById('player2-display').textContent = player2Name;
    document.getElementById('players-container').style.display = 'block';
  } else {
    alert('Please enter both player names!');
  }
});

function updateScore(player, action) {
  const playerPoints = document.getElementById(`${player}-points`);
  let points = parseInt(playerPoints.value);
  if (action === 'correct') {
    points += 1;
  } else if (action === 'wrong') {
    points = Math.max(0, points - 1);
  }
  playerPoints.value = points;
}

document.getElementById('sort-alpha').addEventListener('click', () => {
  if (Array.isArray(quizQuestions)) {
    quizQuestions.sort((a, b) => a.question.localeCompare(b.question));
    renderQuizQuestions();
  }
});

document.getElementById('sort-random').addEventListener('click', () => {
  if (Array.isArray(quizQuestions)) {
    quizQuestions.sort(() => Math.random() - 0.5);
    renderQuizQuestions();
  }
});

document.addEventListener('DOMContentLoaded', fetchQuizQuestions);
