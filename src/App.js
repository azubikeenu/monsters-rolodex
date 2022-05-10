import './App.css';
import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  console.log("render")
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    console.log('fetch triggered')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  // adding monsters as a dependent causes the filered array to appear on component mount
  useEffect(() => {
    console.log('filter triggered')
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [searchField, monsters]);

  const onSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
        className="search"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       searchField: '',
//       monsters: [],
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }
//   handleChange = (e) => {
//     this.setState({ searchField: e.target.value });
//   };

//   render() {
//     const {
//       state: { monsters, searchField },
//       handleChange: onSearchChange,
//     } = this;
//     const filteredMonsters = monsters.filter((monster) =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div className="App">
//         <h1>Monsters Rolodex</h1>
//         <SearchBox
//           placeholder="search monsters"
//           onChangeHandler={onSearchChange}
//           className="search"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
