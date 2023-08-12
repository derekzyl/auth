/* The `const email_regex` is a regular expression that is used to validate email addresses. */
export const email_regex = /^[a-zA-Z0-9_-]{3,}@[a-zA-Z]{3,}.[a-zA-Z]{2,}$/;

/* The `const password_regex` is a regular expression that is used to validate passwords. It checks if
the password contains at least 8 characters and allows a combination of uppercase letters, lowercase
letters, numbers, and special characters like !, @, #, >, <, ,, -, _, *, and &. The `g` flag at the
end of the regular expression indicates that it should match globally, meaning it will check the
entire string for a match rather than stopping at the first match. */
export const password_regex = /^[a-zA-Z0-9!@#><,-_*&]{8,}$/;
