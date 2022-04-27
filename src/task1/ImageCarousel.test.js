import { render } from '@testing-library/react';
import ImageCarousel from "./ImageCarousel";

test("ImageCarousel", () => {
	const { getByText } = render(<ImageCarousel />);
	expect(getByText(/next/i)).toBeInTheDocument();
});
