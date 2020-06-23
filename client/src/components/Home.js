import React from "react";
import Axios from "axios";
import { Header, Card, Image, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = { cats: [] };

  componentDidMount() {
    Axios.get("/api/cats").then((res) => {
      this.setState({ cats: res.data });
    });
  }

  sample() {
    const { cats } = this.state;
    if (!cats.length) return null;
    const index = Math.floor(Math.random() * cats.length);
    return cats[index];
  }
  downVote = (id) => {
    const { cats } = this.state;
    this.setState({ cats: cats.filter((c) => c.id !== id) });
  };

  upVote = (id) => {
    const { cats } = this.state;
    Axios.put(`/api/cats/${id}`).then((res) => {
      this.setState({ cats: cats.filter((c) => c.id !== id) });
    });
  };
  render() {
    const cat = this.sample();
    if (cat) {
      return (
        <div>
          <br />
          <Header as="h1">Cat Tinder</Header>
          <br />
          <Card key={cat.id}>
            <Image src={cat.avatar} />
            <Card.Content>
              <Card.Header>{cat.name}</Card.Header>
              <Card.Description>{cat.breed}</Card.Description>
              <Card.Meta>{cat.registry}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button
                color="red"
                icon
                basic
                onClick={() => this.downVote(cat.id)}
              >
                <Icon name="thumbs down" />
              </Button>
              <Button
                color="green"
                icon
                basic
                onClick={() => this.upVote(cat.id)}
              >
                <Icon name="thumbs up" />
              </Button>
            </Card.Content>
          </Card>
          <Link to="/my_cats">
            <Button color="blue">My Cats</Button>
          </Link>
        </div>
      );
    } else {
      return <Header textAlign="center">No More Cats</Header>;
    }
  }
}

export default Home;
