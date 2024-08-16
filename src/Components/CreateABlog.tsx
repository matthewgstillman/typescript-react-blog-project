import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../Styles/App.scss';

interface CreateBlogPostProps {
  userId: string;
}

const CreateBlogPost: React.FC<CreateBlogPostProps> = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      author: userId,
    };
    console.log(postData);
  };

  return (
    <div className="createBlogMainContainer">
      <h2 className="createBlogHeader">Create a Blog Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="formTitle" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="formCreateBlog" controlId="formContent">
          <Form.Label className="formTitle">Content</Form.Label>
          <Form.Control
            className="formContent"
            as="textarea"
            rows={5}
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateBlogPost;
