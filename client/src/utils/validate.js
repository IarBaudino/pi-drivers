// validate.js
export const validate = (values) => {
    const errors = {};
  
    // Validaciones para 'name'
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 3 || values.name.length > 20) {
      errors.name = "Name must be between 3 and 20 characters";
    } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
      errors.name = "Name can only contain letters and spaces";
    }
  
    // Validaciones para 'lastName'
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Last Name must be less than 20 characters";
    } else if (!/^[A-Za-z\s]+$/.test(values.lastName)) {
      errors.lastName = "Last Name can only contain letters and spaces";
    }
  
    // Validaciones para 'description'
    if (!values.description) {
      errors.description = "Description is required";
    } else if (values.description.length > 2000) {
      errors.description = "Description must be less than 2000 characters";
    }
  
    // Validaciones para 'image' (si se proporciona)
    if (values.image && !isUrlValid(values.image)) {
      errors.image = "Image URL is not valid";
    }
  
    // Validaciones para 'nationality'
    if (!values.nationality) {
      errors.nationality = "Nationality is required";
    } else if (values.nationality.length > 30) {
      errors.nationality = "Nationality must be less than 30 characters";
    }
  
    // Validaciones para 'birthDate'
    if (!values.birthDate) {
      errors.birthDate = "Birth Date is required";
    }
  
    // Validaciones para 'teams'
    if (!values.teams || values.teams.length === 0) {
      errors.teams = "Teams are required";
    }
  
    return errors;
  };
  
  // Función para validar si la URL es válida
  function isUrlValid(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  