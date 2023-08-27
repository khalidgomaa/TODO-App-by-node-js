
const validation = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abartEarly: false });
      if (error) {
        return res.status(400).json({ "message": "error", error });
      } else {
        next();
      }
    };
  };
  export default validation