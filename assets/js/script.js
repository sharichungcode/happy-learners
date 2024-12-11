document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('kid-name').value;
        if (name) {
            document.getElementById('greeting').innerText = 'Well done ' + name + '!';
            document.getElementById('name-input-section').classList.add('d-none');
            document.getElementById('game-section').classList.remove('d-none');
            startGame(name);
        }
    });

    function startGame(name) {
        // Initialize game variables
        let progress = 0;
        let currentLevel = 1;
        const levels = [
            [
                { question: 'What is 2 + 2?', answer: '4' },
                { question: 'What is 3 + 3?', answer: '6' }
            ],
            [
                { question: 'What is 4 + 4?', answer: '8' },
                { question: 'What is 5 + 5?', answer: '10' }
            ]
        ];
        let currentQuestionIndex = 0;

        function showQuestion() {
            if (currentQuestionIndex < levels[currentLevel - 1].length) {
                const question = levels[currentLevel - 1][currentQuestionIndex];
                document.getElementById('question-section').innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${question.question}</h5>
                            <input type="text" class="form-control form-control-lg" id="answer-input" placeholder="Your answer">
                            <button class="btn btn-success btn-lg mt-2" id="submit-answer">Submit</button>
                            <div id="feedback" class="mt-2 text-danger"></div>
                        </div>
                    </div>
                `;
                document.getElementById('submit-answer').addEventListener('click', function() {
                    const answer = document.getElementById('answer-input').value;
                    if (answer === question.answer) {
                        progress += 50; // Assuming 2 questions per level for simplicity
                        document.getElementById('progress-bar').style.width = progress + '%';
                        currentQuestionIndex++;
                        showQuestion();
                    } else {
                        document.getElementById('feedback').innerText = 'Oops! Try again, you can do it!';
                    }
                });
            } else {
                if (currentLevel < levels.length) {
                    $('#levelModal').modal('show');
                    document.getElementById('next-level').addEventListener('click', function() {
                        $('#levelModal').modal('hide');
                        currentLevel++;
                        currentQuestionIndex = 0;
                        progress = 0;
                        document.getElementById('progress-bar').style.width = progress + '%';
                        document.getElementById('level-label').innerText = 'Level ' + currentLevel;
                        showQuestion();
                    }, { once: true }); // Ensure the event listener is added only once
                } else {
                    document.getElementById('question-section').innerHTML = `
                        <h3>Congratulations ${name}! You have completed all levels!</h3>
                        <button class="btn btn-primary btn-lg mt-2" id="play-again">Play Again</button>
                        <button class="btn btn-secondary btn-lg mt-2" id="restart">Restart with New Name</button>
                    `;
                    document.getElementById('play-again').addEventListener('click', function() {
                        currentLevel = 1;
                        currentQuestionIndex = 0;
                        progress = 0;
                        document.getElementById('progress-bar').style.width = progress + '%';
                        document.getElementById('level-label').innerText = 'Level ' + currentLevel;
                        showQuestion();
                    });
                    document.getElementById('restart').addEventListener('click', function() {
                        document.getElementById('game-section').classList.add('d-none');
                        document.getElementById('name-input-section').classList.remove('d-none');
                        document.getElementById('kid-name').value = '';
                    });
                }
            }
        }

        showQuestion();
    }
});