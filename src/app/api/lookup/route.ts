import { NextRequest, NextResponse } from 'next/server';
import { LookupResponse } from '@/lib/types';

const EXTERNAL_API_URL = 'https://pokemon-selector-lilac.vercel.app/api/external/trainer';

export async function GET(request: NextRequest): Promise<NextResponse<LookupResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name || name.trim() === '') {
    return NextResponse.json(
      {
        success: false,
        error: {
          type: 'validation',
          message: 'Enter a name to search',
        },
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.POKEMON_API_KEY;

  if (!apiKey) {
    console.error('POKEMON_API_KEY environment variable is not set');
    return NextResponse.json(
      {
        success: false,
        error: {
          type: 'network',
          message: 'Unable to connect. Please try again.',
        },
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'X-Trainer-Name': name.trim(),
      },
    });

    if (response.status === 404) {
      return NextResponse.json(
        {
          success: false,
          error: {
            type: 'not_found',
            message: 'No trainer found with that name. Check your spelling or register at Pokemon Selector.',
          },
        },
        { status: 404 }
      );
    }

    if (response.status === 401) {
      console.error('API authentication failed');
      return NextResponse.json(
        {
          success: false,
          error: {
            type: 'network',
            message: 'Unable to connect. Please try again.',
          },
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: {
            type: 'network',
            message: 'Unable to connect. Please try again.',
          },
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        trainer_id: data.trainer_id,
        trainer_name: data.trainer_name,
        pokemon: data.pokemon,
      },
    });
  } catch (error) {
    console.error('Error fetching trainer data:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          type: 'network',
          message: 'Unable to connect. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
