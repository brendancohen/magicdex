import axios from "axios";
export const retrieveCards = () => dispatch =>  {
axios
.get('/api/cards/getAll/test@test.com')
.then(res =>  {
  console.log(res)
}).catch(error => {
  console.err(error)
});
};
