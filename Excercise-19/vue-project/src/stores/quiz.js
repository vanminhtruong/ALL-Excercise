import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    answers: [],
    questions: [
      {
        question: 'Câu hỏi 1: Vue.js là gì?',
        options: ['Thư viện JavaScript', 'Framework JavaScript', 'Cả hai', 'Không biết'],
        correct: 1,
      },
      {
        question: 'Câu hỏi 2: Pinia là gì?',
        options: ['Thư viện quản lý trạng thái cho Vue', 'Thư viện UI', 'Framework', 'Không biết'],
        correct: 0
      },
      {
        question: 'Câu hỏi 3: Con gà có bao nhiêu chân',
        options: ['2 chân', '5 chân', '6 chân', 'Không có chân'],
        correct: 0
      },
      // Add more questions here
    ]
  }),
  actions: {
    answerQuestion(optionIndex, questionIndex) {
      this.answers[questionIndex] = optionIndex
    },
    resetQuiz() {
      this.answers = []
    }
  },
  getters: {
    score(state) {
      return state.answers.reduce((acc, answer, index) => {
        return acc + (answer === state.questions[index].correct ? 1 : 0)
      }, 0)
    }
  }
})