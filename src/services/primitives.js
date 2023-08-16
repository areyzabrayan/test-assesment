import axios from 'axios';
const url = 'https://frontendmakaia-modulo2-assesment-json.onrender.com/' //'http://localhost:3001/'
export const addTodoDB = async (data) => {
    try {
        let completeUrl = url + 'todos'
        let result = await axios.post(completeUrl, JSON.stringify(data), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    }
    catch (error) {
        throw error
    }

}
export const deleteTodoDB = async (id) => {
    try {
        let completeUrl = url + `todos/${id}`
        let result = await axios.delete(completeUrl)
    }
    catch (error) {
        throw error
    }

}
export const toggleCompleteDB = async (id) => {
    try {
        let oneTodo = await getTodo(id)

        if (Object.keys(oneTodo).length > 0) {
            oneTodo.completed = !oneTodo.completed
            let completeUrl = url + `todos/${id}`
            let result = await axios.patch(completeUrl, JSON.stringify(oneTodo), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            })
        }

    }
    catch (error) {
        throw error
    }
}

const getTodo = async (id) => {
    try {
        let completeUrl = url + `todos/${id}`

        let result = await axios.get(completeUrl)

        if (Object.keys(result).length > 0) {
            return result.data
        }
        else {
            return {}
        }
    }
    catch (error) {
        throw error
    }
}

export const editTaskDB = async (task, id) => {
    try {
        let tempTodo = await getTodo(id)
        tempTodo.task = task
        let completeUrl = url + `todos/${id}`
        let result = await axios.patch(completeUrl, JSON.stringify(tempTodo), {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
    }
    catch (error) {
        throw error
    }
}


export const getUser = async ({ name, password }) => {
  try {
    const completeUrl = url +  `/user?name=${name}&password=${password}`;
    const { data } = await axios.get(url);
    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getTodosDB = async () => {
    try {
      const completeUrl = url +  `todos`;
      const { data } = await axios.get(completeUrl);
      if(data.length >0){
        return data
      }
      else{
        return[]
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };



