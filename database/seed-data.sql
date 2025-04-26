-- Insert sample users
INSERT INTO users (username, email, password)
VALUES
  ('testuser1', 'testuser1@example.com', 'password1'),
  ('testuser2', 'testuser2@example.com', 'password2'),
  ('testuser3', 'testuser3@example.com', 'password3');

-- Insert sample files
INSERT INTO files (user_id, filename, file_path)
VALUES
  (1, 'file1.jpg', '/path/to/file1.jpg'),
  (2, 'file2.jpg', '/path/to/file2.jpg'),
  (3, 'file3.jpg', '/path/to/file3.jpg');
