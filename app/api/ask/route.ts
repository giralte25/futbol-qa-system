import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Pregunta no válida' },
        { status: 400 }
      );
    }

    // Configuración de Azure Language Service
    const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;
    const key = process.env.AZURE_LANGUAGE_KEY;
    const projectName = process.env.AZURE_PROJECT_NAME || 'futbol-qa';
    const deploymentName = process.env.AZURE_DEPLOYMENT_NAME || 'production';

    if (!endpoint || !key) {
      return NextResponse.json(
        { error: 'Configuración de Azure no encontrada' },
        { status: 500 }
      );
    }

    // Llamada a Azure Custom Question Answering
    const azureUrl = `${endpoint}/language/:query-knowledgebases?projectName=${projectName}&api-version=2021-10-01&deploymentName=${deploymentName}`;

    const azureResponse = await axios.post(
      azureUrl,
      {
        top: 1,
        question: question,
        includeUnstructuredSources: true,
        confidenceScoreThreshold: 0.3,
        answerSpanRequest: {
          enable: true,
          topAnswersWithSpan: 1,
          confidenceScoreThreshold: 0.3
        }
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/json',
        },
      }
    );

    const answers = azureResponse.data.answers;

    if (answers && answers.length > 0) {
      const topAnswer = answers[0];
      
      return NextResponse.json({
        answer: topAnswer.answer || topAnswer.answerSpan?.text || 'No se encontró una respuesta',
        confidence: topAnswer.confidenceScore || topAnswer.answerSpan?.confidenceScore || 0,
        source: topAnswer.source,
        questions: topAnswer.questions || [],
        metadata: topAnswer.metadata,
      });
    } else {
      return NextResponse.json({
        answer: 'Lo siento, no encontré una respuesta a tu pregunta. Intenta reformularla o pregunta sobre temas relacionados con el fútbol español, competiciones europeas o selecciones.',
        confidence: 0,
        questions: [],
      });
    }
  } catch (error: any) {
    console.error('Error al consultar Azure:', error.response?.data || error.message);
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la consulta',
        details: error.response?.data || error.message 
      },
      { status: 500 }
    );
  }
}
