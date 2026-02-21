import { BlueprintDocument } from '../../models/blueprint.model';
import { SceneConfigModel } from '../../models/scene-config.model';

export async function generateSceneFromBlueprint(userId: string, blueprint: BlueprintDocument) {
  const config = {
    environment: 'city_night',
    house: {
      style: 'modern_luxury',
      exteriorLighting: 'cinematic_soft_purple',
      rooms: ['living', 'bedroom', 'reflection_room']
    },
    garage: {
      cars: blueprint.cars,
      glow: true,
      cameraMode: 'cinematic_auto_pan'
    },
    audio: {
      ambientTrack: 'lavision-ambient-alpha',
      volume: 0.5
    },
    controls: {
      movement: 'WASD',
      mouseLook: true
    }
  };

  return SceneConfigModel.findOneAndUpdate(
    { userId },
    { userId, config, generationProvider: 'three-native', status: 'ready' },
    { upsert: true, new: true }
  );
}
