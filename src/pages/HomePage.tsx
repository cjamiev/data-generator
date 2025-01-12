import { useState } from 'react';
import { CustomStringForm } from '../atoms/CustomStringForm';
import { PageWrapper } from '../layout';
import { IFormulaMap } from '../types/formula';

const HomePage = () => {
  const [fieldParams, setFieldParams] = useState<IFormulaMap[]>([]);

  return (
    <PageWrapper>
      <>
        <h1 className="mb-4 text-6xl">Home Page</h1>
        <CustomStringForm fieldParams={fieldParams} onUpdateFields={(updatedFields) => setFieldParams(updatedFields)} />
      </>
    </PageWrapper>
  );
};

export { HomePage };
