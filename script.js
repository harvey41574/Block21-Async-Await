const BASEURL =
  `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-ftb-et-web-pt`;
  const endpoint= {events:'/events'};

  async function getRecipes(){
    const response= await fetch(`${BASEURL}/events`);
    const result= await response.json();
    if(!result.success){
        throw new Error(json.error);
    }
 
  result.data.forEach((item) =>{
    createCard(item);
  });
}

const buttonsRef= document.getElementsByClassName('btn');

const createCard= (item)=>{
  const card= document.createElement('div');
  card.className= 'card';

  const cardHeader= createCardHeader(item.name, 'card-header');
  const cardBody= createCardBody(item.description, 'card-body');
  const cardFooter= createCardFooter(['card-footer', 'btn'], item.id);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.setAttribute('data-id', item.id);

  document.querySelector('grid').appendChild(card);
};

const createCardHeader= (title, cssClass)=> {
  const header= document.createElement('div');
  const headerTitle= document.createTextNode(title);
  header.className= cssClass;
  header.appendChild(headerTitle);

  return header;
};

const createCardBody= (text, cssClass)=> {
  const body= document.createElement('div');
  const bodyText= document.createTextNode(text);
  body.className= cssClass;
  body.appendChild(bodyText);

  return body;
};

const createCardFooter= (classes)=> {
  const footer= document.createElement('div');
  const button= document.createElement('button');
  const buttonText= document.createTextNode('delete');

  footer.className= classes[0];
  button.className= classes[1];

  button.appendChild(buttonText);
  footer.appendChild(button);

  button.addEventListener('click', async(event)=> {
    const selectedCard= event.target.closest('.card');
    const id= selectedCard.dataset.id;
    const result= await deleteRecipe(id);
  })
  return footer;
}

async function createRecipe(recipe) {
  const response = await fetch(`${BASEURL}/recipes`, {
      method: 'post',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe),
  });
  const json = await response.json();

  if(!json.success) {
      throw new Error(json.error.message);
  }

  return json.data;
}

async function getRecipe(id) {
  const response = await fetch(`${BASEURL}/recipes/${id}`);
  const json = await response.json();

  if(!json.success) {
      throw new Error(json.error.message);
  }

  return json.data;
}

async function updateRecipe(id, recipe) {
  const response = await fetch(`${BASEURL}/recipes/${id}`, {
      method: 'put',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe),
  });
  const json = await response.json();

  if(!json.success) {
      throw new Error(json.error.message);
  }

  return json.data;
}
async function deleteRecipe(id) {
  const response = await fetch(`${BASEURL}/recipes/${id}`, {
      method: 'delete'
  });

  if(response.status === 204) {
      return true;
  }

  throw new Error(`unable to remove receipe with id ${id}`);
}