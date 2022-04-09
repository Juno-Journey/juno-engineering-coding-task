import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

describe('ImageCarousel Component', function () {
  it.only('A loader should be visible while the images are still being fetched', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it.only('does not render carousel until all images have been fetched', async () => {
    const { queryByTestId } = render(<ImageCarousel />);
    expect(queryByTestId('carousel')).toBeNull();
  });

  it('should not show the loader when all images fetched', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    waitForElementToBeRemoved = expect(getByTestId('loader')).toBeNull();
  });

  it('renders carousel after all images have been fetched', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    const carousel = await waitFor(() => getByTestId('carousel'));
    expect(carousel).toBeInTheDocument();
  });

  it('renders 1 image every time', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    await waitFor(() => expect(getByTestId('carousel')).toBeInTheDocument());
    const images = getByTestId('carousel').querySelectorAll('img');
    expect(images.length).toBe(1);
  });

  it('should render the next button', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    await waitFor(() => expect(getByTestId('carousel')).toBeInTheDocument());
    const nextButton = getByTestId('next');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
  });

  it('should render the previous button', async () => {
    const { getByTestId } = render(<ImageCarousel />);
    await waitFor(() => expect(getByTestId('carousel')).toBeInTheDocument());
    const prevButton = getByTestId('previous');
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton);
  });
});
