import { screen } from '@testing-library/react';
import { Button } from '@/shared/components/ui/button';
import { renderWithProviders } from '../utils/render';

describe('Button', () => {
  it('renders accessible button text', () => {
    renderWithProviders(<Button>Save changes</Button>);

    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });
});
