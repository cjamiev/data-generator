import { CodeFieldInput } from '../../atoms/CodeFieldInput';
import { ICodeProp } from '../../types/codeField';

const MOVE_UP = 'U';
const MOVE_DOWN = 'D';

interface IDisplayCodeFields {
  codeFields: ICodeProp[];
  onHandleRemoveField: (selectedIndex: number) => void;
  onHandleColumnUpdateChange: (updatedLabel: string, updatedName: string, selectedIndex: number) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const DisplayCodeFields = ({
  codeFields,
  onHandleRemoveField,
  onHandleColumnUpdateChange,
  onMoveUp,
  onMoveDown,
}: IDisplayCodeFields) => {
  if (!codeFields.length) {
    return null;
  }

  return (
    <div>
      <div className="mb-2 flex flex-row gap-x-2">
        <div className="mr-2 w-fit text-lg">Reorder</div>
        <div className="mr-20 w-fit text-lg">Type</div>
        <div className="ml-2 mr-20 w-fit text-lg">Label</div>
        <div className="ml-2 w-fit text-lg">Variable Name</div>
      </div>
      {codeFields.map((item: ICodeProp, index: number) => {
        const isFirst = index === 0;
        const isLast = index === codeFields.length - 1;

        return (
          <div key={item.variableName} className="mb-2 flex flex-row gap-2">
            <div className="w-18 flex gap-2 font-sans">
              {!isFirst ? (
                <button className="w-fit" onClick={() => onMoveUp(index)}>
                  {MOVE_UP}
                </button>
              ) : (
                <div className="w-8 rounded bg-gray-500 text-center"> </div>
              )}
              {!isLast ? (
                <button className="w-fit" onClick={() => onMoveDown(index)}>
                  {MOVE_DOWN}
                </button>
              ) : (
                <div className="w-8 rounded bg-gray-500 text-center"> </div>
              )}
            </div>
            <span className="w-32 rounded border-2 border-dashed border-sky-500 pl-4 pt-3">{item.type}</span>
            <CodeFieldInput
              displayLabel={item.label}
              name={item.variableName}
              onHandleColumnUpdateChange={onHandleColumnUpdateChange}
              index={index}
            />
            <button
              className="w-fit"
              onClick={() => {
                onHandleRemoveField(index);
              }}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};
