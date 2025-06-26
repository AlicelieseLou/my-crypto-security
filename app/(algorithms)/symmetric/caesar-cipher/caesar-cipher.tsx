'use client';

import {
  ArrowLeftRight,
  ArrowRightLeft,
  Download,
  Eraser,
  Minus,
  Plus,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useGlobalAlert } from '@/components/alert';
import {
  decrypt,
  downloadResult,
  encrypt,
  generateSteps,
} from '@/utilities/algorithms/symmetric/caesar-cipher-utils';
import { autoResize } from '@/utilities/dom/auto-resize-textarea';

export default function CaesarCipher() {
  const showAlert = useGlobalAlert();

  const keyRef = useRef<HTMLInputElement>(null);
  const plainRef = useRef<HTMLTextAreaElement>(null);
  const cipherRef = useRef<HTMLTextAreaElement>(null);

  const [key, setKey] = useState<number>(1);
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [plainLabel] = useState<string>('PLAIN TEXT');
  const [cipherLabel] = useState<string>('CIPHER TEXT');
  const [plainText, setPlainText] = useState<string>('');
  const [cipherText, setCipherText] = useState<string>('');
  const [calculationSteps, setCalculationSteps] = useState<string>('');

  const handleIncrement = () => {
    if (keyRef.current) {
      const current = parseInt(keyRef.current.value) || 0;
      setKey(current + 1);
    }
  };

  const handleKeyChange = () => {
    if (keyRef.current) {
      const cleaned = keyRef.current.value.replace(/[^0-9]/g, '');
      let number = parseInt(cleaned) || 1;
      if (number <= 0) number = 1;
      setKey(number);
    }
  };

  const handleDecrement = () => {
    if (keyRef.current) {
      const current = parseInt(keyRef.current.value) || 0;
      if (current > 1) {
        setKey(current - 1);
      }
    }
  };

  const handleDownload = () => {
    const isPlainEmpty = plainText.trim() === '';
    const isCipherEmpty = cipherText.trim() === '';
    const isKeyInvalid = !key || key <= 0;

    if (isKeyInvalid || isPlainEmpty || isCipherEmpty) {
      showAlert('error', 'Fields must not be empty or key is invalid!');
      return;
    }

    showAlert('success', 'Download completed successfully!');

    downloadResult({
      mode: isSwap ? 'decrypt' : 'encrypt',
      key,
      plainText,
      cipherText,
    });
  };

  const handleClear = () => {
    setKey(1);
    setIsSwap(false);
    setPlainText('');
    setCipherText('');
    setCalculationSteps('');
  };

  useEffect(() => {
    if (isSwap) {
      setCipherText(decrypt(plainText, key));
    } else {
      setCipherText(encrypt(plainText, key));
    }
  }, [plainText, key, isSwap]);

  useEffect(() => {
    autoResize(plainRef.current);
    autoResize(cipherRef.current);
  }, [plainText, cipherText]);

  useEffect(() => {
    setCalculationSteps(generateSteps(plainText, key, isSwap));
  }, [plainText, key, isSwap]);

  return (
    <section className="pb-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center py-10">Caesar Cipher</h2>

        <div className="bg-base-200 p-6 rounded-xl mb-4 shadow-md items-center justify-items-center gap-6">
          <div className="flex w-full flex-col">
            <div className="join w-full flex">
              <button
                className="btn btn-neutral join-item rounded-l-full w-30"
                onClick={handleDecrement}
              >
                <Minus className="w-4 h-4 fill-current" />
              </button>
              <div className="grow">
                <input
                  type="text"
                  ref={keyRef}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="input font-code join-item text-center text-current w-full outline-none focus:outline-none focus:ring-0"
                  required
                  placeholder="Enter your key number..."
                  value={key}
                  onChange={handleKeyChange}
                />
              </div>
              <button
                className="btn btn-neutral join-item rounded-r-full w-30"
                onClick={handleIncrement}
              >
                <Plus className="w-4 h-4 fill-current" />
              </button>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-2 gap-8 w-full flex justify-items-center">
              <button
                className="btn btn-neutral w-full flex"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 text-current" />
                Download
              </button>
              <button
                className="btn btn-neutral w-full flex"
                onClick={handleClear}
              >
                <Eraser className="w-4 h-4 text-current" />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="tabs tabs-border w-full flex">
            <input
              type="radio"
              name="my-tabs"
              className="tab flex-1 text-center"
              aria-label="Encrypt & Decrypt"
              defaultChecked
            />
            <div className="tab-content">
              <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <label className="btn btn-circle swap swap-rotate bg-transparent border-none outline-none focus:ring-0">
                  <input
                    type="checkbox"
                    checked={isSwap}
                    onChange={() => setIsSwap((prev) => !prev)}
                  />
                  <ArrowRightLeft className="swap-off w-4 h-4 text-current" />
                  <ArrowLeftRight className="swap-on w-4 h-4 text-current" />
                </label>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-2">
                  <div
                    className={`text-lg text-center font-medium mb-2 ${
                      isSwap ? 'order-2' : 'order-1'
                    }`}
                  >
                    {plainLabel}
                  </div>
                  <div
                    className={`text-lg text-center font-medium mb-2 ${
                      isSwap ? 'order-1' : 'order-2'
                    }`}
                  >
                    {cipherLabel}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div
                    className={`form-control ${isSwap ? 'order-2' : 'order-1'}`}
                  >
                    <textarea
                      ref={isSwap ? cipherRef : plainRef}
                      className="textarea font-code bg-base-200 text-justify outline-none focus:outline-none focus:ring-0 min-h-48 w-full resize-none overflow-hidden"
                      placeholder={
                        isSwap
                          ? 'Your decryption message is here...'
                          : 'Enter your message...'
                      }
                      required
                      value={isSwap ? cipherText : plainText}
                      spellCheck={false}
                      onChange={(e) =>
                        isSwap
                          ? setCipherText(e.target.value)
                          : setPlainText(e.target.value)
                      }
                      readOnly={isSwap ? true : false}
                    />
                  </div>
                  <div
                    className={`form-control ${isSwap ? 'order-1' : 'order-2'}`}
                  >
                    <textarea
                      ref={isSwap ? plainRef : cipherRef}
                      className="textarea font-code bg-base-200 text-justify outline-none focus:outline-none focus:ring-0 min-h-48 w-full resize-none overflow-hidden"
                      placeholder={
                        isSwap
                          ? 'Enter your message...'
                          : 'Your encryption message is here...'
                      }
                      value={isSwap ? plainText : cipherText}
                      spellCheck={false}
                      onChange={(e) =>
                        isSwap
                          ? setPlainText(e.target.value)
                          : setCipherText(e.target.value)
                      }
                      readOnly={isSwap ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="my-tabs"
              className="tab flex-1 text-center"
              aria-label="Result Calculation Step"
            />
            <div className="tab-content p-6">
              <div className="mockup-code w-full">
                {calculationSteps.split('\n').map((line, index) => (
                  <pre
                    key={index}
                    {...(line.trim() !== '' ? { 'data-prefix': '$' } : {})}
                  >
                    <code>{line}</code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
