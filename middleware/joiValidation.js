const Joi = require("joi");
const logger = require("../wrapper/logger");

const userSignUpSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      "number.base": "Phone number must be a number.",
      "number.min": "Phone number must be at least 10 digits.",
      "number.max": "Phone number cannot exceed 10 digits.",
      "any.required": "Phone number is required.",
    }),
  role: Joi.string(),
  address: Joi.string(),
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});

const userSignUpSchemaValidation = (req, res, next) => {
  try {
    const { error, value } = userSignUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        "userSignUpSchemaValidation ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info("userSignUpSchemaValidation ::  user data is valid", req.body);
    req.body = value;
    next();
  } catch (error) {
    logger.error("userSignUpSchemaValidation ::  user data is invalid", error);
    return res.status(500).send({ message: error.message });
  }
};

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const userLoginValidationSchema = async (req, res, next) => {
  try {
    const { error, value } = await loginValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        "userLoginValidationSchema ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info("userLoginValidationSchema ::  user data is valid", req.body);
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      "userLoginValidationSchema ::  user data is invalid",
      req.body
    );
    return res.status(500).send({ message: error.message });
  }
};

const verifyUserEmail = Joi.object({
  email: Joi.string().email().required(),
});

const verifyUserEmailValidation = async (req, res, next) => {
  try {
    const { error, value } = await verifyUserEmail.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      logger.error(
        "verifyUserEmailValidation ::  user email is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info("verifyUserEmailValidation ::  user email is valid", req.body);
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      "verifyUserEmailValidation ::  user data is invalid",
      req.body
    );
    return res.status(500).send({ message: error.message });
  }
};

const addUserSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      "number.base": "Phone number must be a number.",
      "number.min": "Phone number must be at least 10 digits.",
      "number.max": "Phone number cannot exceed 10 digits.",
      "any.required": "Phone number is required.",
    }),
  role: Joi.string(),
  profileImage: Joi.string().uri().optional(),
  address: Joi.string(),
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});

const userAddValidationSchema = async (req, res, next) => {
  try {
    const { error, value } = await addUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        "userAddValidationSchema ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info("userAddValidationSchema ::  user data is valid", req.body);
    req.body = value;
    next();
  } catch (error) {
    logger.error("userAddValidationSchema ::  user data is invalid", req.body);
    return res.status(500).send({ message: error.message });
  }
};

const updateUserSchema = Joi.object({
  name: Joi.string().min(4).max(20).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  phone: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .optional()
    .messages({
      "number.base": "Phone number must be a number.",
      "number.min": "Phone number must be at least 10 digits.",
      "number.max": "Phone number cannot exceed 10 digits.",
      "any.required": "Phone number is required.",
    }),
  profileImage: Joi.string().uri().optional(),
  address: Joi.string().optional(),
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});

const userUpdateValidationSchema = async (req, res, next) => {
  try {
    const { error, value } = await updateUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        "userUpdateValidationSchema ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info("userUpdateValidationSchema ::  user data is valid", req.body);
    req.body = value;
    next();
  } catch (error) {
    logger.error("userAddValidationSchema ::  user data is invalid", req.body);
    return res.status(500).send({ message: error.message });
  }
};

const productAddSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  price: Joi.number().integer().min(0).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

const productValidationAddSchema = async (req, res, next) => {
  try {
    const { error, value } = await productAddSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        `productValidationAddSchema ::  product data is invalid ${error.details}`
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info(
      "productValidationAddSchema ::  product data is valid",
      req.body
    );
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      `productValidationAddSchema ::  product data is invalid ${error.details}`
    );
    return res.status(500).send({ message: error.message });
  }
};

const productUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  isVerified: Joi.boolean().optional(),
  image: Joi.string().uri().optional(),
  price: Joi.number().integer().min(0).optional(),
  rating: Joi.number().integer().min(1).max(5).optional(),
});

const productValidationUpdateSchema = async (req, res, next) => {
  try {
    const { error, value } = await productUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      logger.error(
        "productValidationUpdateSchema ::  product data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info(
      "productValidationUpdateSchema ::  product data is valid",
      req.body
    );
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      "productValidationUpdateSchema ::  user data is invalid",
      req.body
    );
    return res.status(500).send({ message: error.message });
  }
};

const addToCartSchema = Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const addToCartSchemaValidation = async (req, res, next) => {
  try {
    const { error, value } = await addToCartSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      logger.error(
        "addToCartSchemaValidation ::  add to cart data is invalid",
        error.details
      );
    }
  } catch (error) {
    logger.error(
      "addToCartSchemaValidation ::  add to cart data is invalid",
      error.details
    );
    return res
      .status(500)
      .json({
        message: "addToCartSchemaValidation ::  add to cart data is invalid",
      });
  }
};

const resetForgetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(8).required(),
});

const resetForgetPasswordSchemaValidation = async (req, res, next) => {
  try {
    const { error, value } = await resetForgetPasswordSchema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {
      logger.error(
        "resetForgetPasswordSchemaValidation ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info(
      "resetForgetPasswordSchemaValidation ::  user data is valid",
      req.body
    );
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      "resetForgetPasswordSchemaValidation ::  user data is invalid",
      req.body
    );
    return res.status(500).send({ message: error.message });
  }
};

const resetPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

const resetPasswordSchemaValidation = async (req, res, next) => {
  try {
    const { error, value } = await resetPasswordSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      logger.error(
        "resetPasswordSchemaValidation ::  user data is invalid",
        error.details
      );
      return res.status(400).send({ message: error.details });
    }
    logger.info(
      "resetPasswordSchemaValidation ::  user data is valid",
      req.body
    );
    req.body = value;
    next();
  } catch (error) {
    logger.error(
      "resetPasswordSchemaValidation ::  user data is invalid",
      req.body
    );
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  userSignUpSchemaValidation,
  userLoginValidationSchema,
  userAddValidationSchema,
  userUpdateValidationSchema,
  productValidationAddSchema,
  productValidationUpdateSchema,
  addToCartSchemaValidation,
  verifyUserEmailValidation,
  resetForgetPasswordSchemaValidation,
  resetPasswordSchemaValidation,
};
