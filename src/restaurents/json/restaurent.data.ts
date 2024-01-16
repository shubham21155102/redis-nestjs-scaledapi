import * as datas1 from './file1.json';
const allRestaurents = [];
async function getRestaurentsName() {
  const data = await datas1;
  data.forEach((element) => {
    allRestaurents.push(element.name);
  });
  console.log(allRestaurents);
  return allRestaurents;
}
export default getRestaurentsName;
