<template>

  <template v-if="this.question">
    <h1 v-html="this.question"></h1>
    <template v-for="(answer, index) in this.answers" v-bind:key="index">
      <input
        :disabled="this.answerSubmitted" 
        type="radio"
        name="options" 
        :value="answer" 
        v-model="this.chosen_answer">
      <label v-html="answer"></label><br>
    </template>
    <button @click="this.submitAnswer()" class="send" type="button">Enviar</button>
  </template>

  <section class="result" v-if="this.answerSubmitted">
    <template v-if="this.chosen_answer == this.correctAnswer">
      <h4>&#9989; Parabéns, a resposta "{{this.correctAnswer}}" está correta.</h4>
    </template>
    <template v-else>
      <h4>&#10060;  Que pena, a resposta está errada. A resposta correta é "{{this.correctAnswer}}".</h4>
    </template>
  </section>

</template>

<script>
const _ = require('lodash');

export default {
  name: 'App',
  data () {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosen_answer: undefined,
      answerSubmitted: false
    }
  },
  computed: {
    answers() {
      // var answers = JSON.parse(JSON.stringify(this.incorrectAnswers));
      var answers = _.cloneDeep(this.incorrectAnswers);
      answers.splice(Math.round(Math.random() * answers.length), 0, this.correctAnswer);
      return answers;
    }
  },
  created() {
    this.axios
    .get('https://opentdb.com/api.php?amount=1&category=18')
    .then((response) => {
      this.question = response.data.results[0].question;
      this.incorrectAnswers = response.data.results[0].incorrect_answers;
      this.correctAnswer = response.data.results[0].correct_answer;

    })
  },
  methods: {
    submitAnswer() {
      if (!this.chosen_answer) {
        alert('Escolha uma resposta');
      } else {
        this.answerSubmitted = true;
        if (this.chosen_answer == this.correctAnswer) {
          console.log('Acertouu');
        } else {
          console.log('Erroouuuuu');
        }
      }
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px auto;
  max-width: 960px;

  input[type=radio] {
    margin: 12px 4px;
  }

  button.send {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}
</style>
