const schema = [
  { id: "name", type: "text", label: "Name", required: true },
  { id: "age", type: "number", label: "Age", required: true },
  { id: "address", type: "text", label: "Address", required: true },
  {
    id: "role",
    type: "select",
    label: "Role",
    options: ["Admin", "User"],
    required: true,
  },
  // ejemplo de campo condicional
  {
    id: "adminCode",
    type: "text",
    label: "Admin Code",
    showIf: (values) => values.role === "Admin",
  },
];

function validateForm(req, res, next) {
    const values = req.body;
    const errors = {}

    schema.forEach((field) => {
        const value = values[field.id];
        const id = field.id;

        const visible = !field.showIf || field.showIf(values);
        if(!visible) return;

        if(field.required && !value) {
            errors[id] = `${field.label} Required`;
            return;
        }

        if(field.type === 'number' && isNaN(Number(value))) {
            errors[id] = `${field.label} Must be a number`;
            return;
        }

        if(field.type === 'select' && value && !field.options.includes(value)) {
            errors[id] = `Invalid option`;
            return;
        }
    })

    if(Object.keys(errors).length > 0) {
        res.status(400).json({errors})
    }

    next()
}

module.exports = validateForm
