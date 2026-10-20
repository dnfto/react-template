import { screen } from '@testing-library/react';
import { UsersPage } from '@/pages/users/users-page';
import { renderWithProviders } from '../utils/render';

describe('UsersPage', () => {
  it('renders users from mocked API', async () => {
    renderWithProviders(<UsersPage />);

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });
});
