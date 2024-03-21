import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// Create a client
const queryClient = new QueryClient()

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      return fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json())
    }
  })

  // Mutations
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
    onSuccess: () => {
      // Invalidate without ref
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>{query.data?.map((todo: any) => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

// export default function App() {
function App2() {
  const initForm = { name: '', age: '' };
  const [formInfo, setFormInfo] = useState(initForm);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formInfo);
    setFormInfo(initForm);
  };

  const { name, age } = formInfo;

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" name='name' value={name} onChange={onChange} />
      </label>
      <label>
        Age:
        <input type="number" name='age' value={age} onChange={onChange} />
      </label>
      <button>Submit</button>
    </form>
  );
}


export default function App() {
  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    e.target.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="email" name='name' pattern=".+@example\.com" />
      </label>
      <label>
        Age:
        <input type="number" name='age' />
      </label>
      <button>Submit</button>
    </form>
  );
}
