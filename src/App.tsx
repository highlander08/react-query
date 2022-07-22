import { useEffect, useState } from "react";
import "./App.css";

interface IData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const getUser = async (id: number) => {
  const request = await fetch(`https://reqres.in/api/users/${id}?delay=1`);

  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.error);
  }

  return response.data as IData;
};

function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [user, setUser] = useState<IData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(currentUserId)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [currentUserId]);

  if (!user || isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p>Server Error</p>
      </section>
    );
  }

  return (
    <section>
      <img src={user.avatar} alt="avatar" />
      <p>
        {user.first_name} {user.last_name} - {user.id}
      </p>
      <p>Email: {user.email}</p>
      <div>
        <button onClick={() => setCurrentUserId((prev) => prev - 1)}>
          Prev
        </button>
        <button onClick={() => setCurrentUserId((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}

export default App;
