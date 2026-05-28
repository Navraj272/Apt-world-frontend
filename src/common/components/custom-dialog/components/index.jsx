'use client';
import { cross } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
const CustomDialog = ({ isOpen, handleClick, handleChange, content }) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClick} className="">
      <DialogContent className="max-w-lg min-h-[100] mx-auto mb-6 rounded-lg shadow-lg border-none bg-[var(--dilog-background)] gap-4 w-auto px-5 py-4 ">
        <DialogTitle />
        <DialogHeader className="flex flex-row justify- absolute right-1 top-1">
          <Image
            src={cross}
            alt="close icon"
            onClick={handleClick}
            className="hover:scale-125 rounded-full cursor-pointer hover:bg-amber-500 hover:invert-0 w-6 h-6 invert"
            height={24}
            width={24}
            loading="lazy"
          />
        </DialogHeader>
        <div className="flex justify-center items-center p-0 text-white text-center">
          {content}
        </div>

        <div className="px-3 flex justify-evenly items-center mt-4 gap-x-3 ">
          <Button
            onClick={handleChange}
            className="bg-button-bg  text-white px-6 py-3 font-lexend rounded-[8px] hover:scale-105"
          >
            Yes
          </Button>

          <Button
            onClick={handleClick}
            className="bg-button-bg text-white px-6 py-3 font-lexend rounded-[8px] hover:scale-105"
          >
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
