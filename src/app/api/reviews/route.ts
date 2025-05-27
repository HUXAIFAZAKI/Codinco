import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataFilePath = path.join(process.cwd(), 'src/data/reviews.json');

// Helper function to read reviews
const readReviews = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { reviews: [] };
  }
};

// Helper function to write reviews
const writeReviews = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readReviews();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = readReviews();

    const newReview = {
      id: uuidv4(),
      ...body,
      status: 'pending', // All reviews start as pending for admin approval
    };

    data.reviews.push(newReview);
    writeReviews(data);

    return NextResponse.json({
      message: 'Review submitted successfully',
      review: newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

// Admin-only endpoint to manage reviews
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');
    const adminKey = searchParams.get('adminKey');

    // Simple admin key check (you should use a more secure method in production)
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const data = readReviews();
    data.reviews = data.reviews.filter((review: any) => review.id !== reviewId);
    writeReviews(data);

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}

// Admin-only endpoint to approve reviews
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const reviewId = searchParams.get('id');
    const adminKey = searchParams.get('adminKey');

    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!reviewId) {
      return NextResponse.json(
        { error: 'Review ID is required' },
        { status: 400 }
      );
    }

    const data = readReviews();
    const reviewIndex = data.reviews.findIndex(
      (review: any) => review.id === reviewId
    );

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    data.reviews[reviewIndex].status = 'approved';
    writeReviews(data);

    return NextResponse.json({ message: 'Review approved successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to approve review' },
      { status: 500 }
    );
  }
}
