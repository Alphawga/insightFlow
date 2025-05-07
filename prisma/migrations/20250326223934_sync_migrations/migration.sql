-- AlterTable
ALTER TABLE "AdMetrics" ADD COLUMN     "adGroupId" TEXT;

-- AddForeignKey
ALTER TABLE "AdMetrics" ADD CONSTRAINT "AdMetrics_adGroupId_fkey" FOREIGN KEY ("adGroupId") REFERENCES "AdGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
