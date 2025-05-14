import { logRoles, render, screen } from '@testing-library/react';
import Sandbox from './Sandbox';
import userEvent, { UserEvent } from '@testing-library/user-event';

const getFormElements = () => {
  return {
    emailInputElement: screen.getByRole('textbox', { name: /email/i }),
    passwordInputElement: screen.getByLabelText('Password'),
    confirmPasswordInputElement: screen.getByLabelText('Confirm Password'),
    submitButton: screen.getByRole('button', { name: /submit/i }),
  };
};

describe('05-form-testing', async () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Sandbox />);
  });

  test('it should be initially empty', () => {
    // const { container } = render(<Sandbox />);
    // screen.debug();
    // logRoles(container);
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    expect(emailInputElement).toHaveValue('');

    expect(passwordInputElement).toHaveValue('');

    expect(confirmPasswordInputElement).toHaveValue('');
  });

  it('should be able to type in the input', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
    } = getFormElements();

    await user.type(emailInputElement, 'test@test.com');
    expect(emailInputElement).toHaveValue('test@test.com');

    await user.type(passwordInputElement, '123456');
    expect(passwordInputElement).toHaveValue('123456');

    await user.type(confirmPasswordInputElement, '123456');
    expect(confirmPasswordInputElement).toHaveValue('123456');
  });

  it('should show email error if email is invalid', async () => {
    const { emailInputElement, submitButton } = getFormElements();

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    await user.type(emailInputElement, 'test');
    await user.click(submitButton);
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('should show password error if password is less than 5 characters', async () => {
    const { emailInputElement, passwordInputElement, submitButton } =
      getFormElements();

    expect(
      screen.queryByText(/Password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, '1234');
    await user.click(submitButton);

    expect(
      screen.getByText(/Password must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  it('should show error if password does not match', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      submitButton,
    } = getFormElements();

    expect(
      screen.queryByText(/Passwords do not match/i)
    ).not.toBeInTheDocument();

    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, '123456');
    await user.type(confirmPasswordInputElement, 'secret');
    await user.click(submitButton);

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('should no errors and clean fields after submitting', async () => {
    const {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      submitButton,
    } = getFormElements();

    await user.type(emailInputElement, 'test@test.com');
    await user.type(passwordInputElement, 'secret');
    await user.type(confirmPasswordInputElement, 'secret');
    await user.click(submitButton);

    expect(emailInputElement).toHaveValue('');
    expect(passwordInputElement).toHaveValue('');
    expect(confirmPasswordInputElement).toHaveValue('');

    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();

    expect(
      screen.queryByText(/password must be at least 5 characters/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();
  });
});
