import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "semantic-ui-react";
import ImageUploading from "react-images-uploading";

class CreateArticle extends Component {
  state = {
    message: "",
    image: []
  };

  onCreate = async e => {
    e.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.post(
      "/articles",
      {
        article: {
          title: e.target.title.value,
          lead: e.target.lead.value,
          content: e.target.content.value,
          category: this.state.selectedCategory,
          image: this.state.image
        }
      },
      { headers: headers }
    );
    if (response.status === 200) {
      this.setState({ message: response.data.message });
    } else {
      this.setState({ message: response.data.error });
    }
  };

  handleCategoryChange = value => {
    this.setState({
      selectedCategory: value
    });
  };

  onImageDropHandler = imageList => {
    if (imageList.length > 0) {
      this.setState({
        image: imageList[0].dataURL
      });
    }
  };

  render() {
    let categoryOptions = [
      { key: "latest_news", text: "Latest News", value: "latest_news" },
      { key: "Tech", text: "Tech", value: "tech" },
      { key: "Food", text: "Food", value: "food" },
      { key: "Sports", text: "Sports", value: "sports" },
      { key: "Culture", text: "Culture", value: "culture" }
    ];

    return (
      <div id="create">
        <Form id="new-article-form" onSubmit={this.onCreate}>
          Title{" "}
          <Form.Input id="title" placeholder="Title" key="title" width={6} />
          Lead
          <Form.Input id="lead" placeholder="Lead" key="lead" width={6} />
          Content
          <Form.TextArea
            id="content"
            placeholder="Content"
            key="content"
            width={6}
          />
          <Form.Select
            id="category"
            options={categoryOptions}
            onChange={(event, data) => {
              this.handleCategoryChange(data.value);
            }}
            label="Categories"
            key="category"
            name="category"
            width={6}
          />
          <ImageUploading onChange={this.onImageDropHandler}>
            {({ imageList, onImageUpload }) => (
              <div className="upload__image-wrapper">
                <Button id="image-upload" onClick={onImageUpload}>
                  Upload images
                </Button>
                &nbsp;
                {imageList.map(image => (
                  <div key={image.key} className="image-item">
                    <img src={image.dataURL} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <Button
                        size="tiny"
                        id="imageUpdate"
                        onClick={() => {
                          image.onUpdate();
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        id="imageRemove"
                        size="tiny"
                        onClick={image.onRemove}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <br />
          <Button id="create-article-button" type="submit">
            Create Article
          </Button>
        </Form>
        <p id="message">{this.state.message}</p>
      </ div>
    );
  }
}

export default CreateArticle;
